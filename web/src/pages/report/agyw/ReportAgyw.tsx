import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Space,
  Typography,
  Image,
} from "antd";
import { query } from "@app/utils/users";
import { queryAll } from "@app/utils/province";
import { queryDistrictsByProvinces } from "@app/utils/locality";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dreams from "../../../assets/dreams.png";

import { generateXlsReport } from "./ReportGenerator";
import { useSelector, useDispatch } from "react-redux";
import { agywPrevQuery } from "@app/utils/report";
import { serviceAgesBandsQuery } from "@app/utils/report";
import { loadAgywData, loadServiceAgebands } from "@app/store/reducers/report";
import { Title as AppTitle } from "@app/components";
import LoadingModal from "@app/components/modal/LoadingModal";
const { Option } = Select;
const { Title } = Typography;

const ReportAgyw = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any>(undefined);
  const [selectedDistricts, setSelectedDistricts] = useState<any[]>([]);
  const [initialDate, setInitialDate] = useState<any>();
  const [finalDate, setFinalDate] = useState<any>();
  const [form] = Form.useForm();
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const RequiredFieldMessage = "Obrigatório!";
  const userSelector = useSelector((state: any) => state?.auth);
  const currentUserName = userSelector.currentUser.name;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const loggedUser = await query(localStorage.user);
      let provinces;
      if (loggedUser.provinces.length > 0) {
        provinces = loggedUser.provinces;
      } else {
        provinces = await queryAll();
      }

      setProvinces(provinces);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const onChangeProvinces = async (values: any) => {
    if (values.length > 0) {
      const provs = provinces.filter((item) =>
        values.includes(item.id.toString())
      );
      setSelectedProvinces(provs);
      const dataDistricts = await queryDistrictsByProvinces({
        provinces: Array.isArray(values) ? values : [values],
      });
      setDistricts(dataDistricts);
    } else {
      setDistricts(undefined);
    }

    form.setFieldsValue({ districts: [] });
  };

  const onChangeDistricts = async (values: any) => {
    if (values.length > 0) {
      const distrs = districts.filter((item) =>
        values.includes(item.id.toString())
      );
      setSelectedDistricts(distrs);
    }
  };

  const handleFetchData = async () => {
    if (
      selectedProvinces.length < 1 ||
      selectedDistricts.length < 1 ||
      initialDate === undefined ||
      finalDate === undefined
    ) {
      toast.error("Por favor selecione os filtros para relatorio");
    } else {
      setDataLoading(true);
      const districtsIds = selectedDistricts.map((district) => {
        return district.id;
      });
      const startDate = moment(initialDate).format("YYYY-MM-DD");
      const endDate = moment(finalDate).format("YYYY-MM-DD");

      const responseData = await agywPrevQuery(
        districtsIds,
        startDate,
        endDate
      );

      const responseServiceAgesBands = await serviceAgesBandsQuery();

      dispatch(loadAgywData(responseData));
      dispatch(loadServiceAgebands(responseServiceAgesBands));

      navigate("/previewAgyw", {
        state: {
          provinces: selectedProvinces,
          districts: selectedDistricts,
          initialDate: moment(initialDate).format("YYYY-MM-DD"),
          finalDate: moment(finalDate).format("YYYY-MM-DD"),
        },
      });
      setDataLoading(false);
    }
  };

  const handleGenerateXLSXReport = () => {
    if (
      selectedProvinces.length < 1 ||
      selectedDistricts.length < 1 ||
      initialDate === undefined ||
      finalDate === undefined
    ) {
      toast.error("Por favor selecione os filtros para relatorio");
    } else {
      setDataLoading(true);
      const districtsIds = selectedDistricts.map((dist) => {
        return dist.id;
      });
      const startDate = moment(initialDate).format("YYYY-MM-DD");
      const endDate = moment(finalDate).format("YYYY-MM-DD");
      generateXlsReport(
        currentUserName,
        districtsIds,
        startDate,
        endDate,
        selectedDistricts
      );
      setDataLoading(false);
    }
  };

  return (
    <Fragment>
      <AppTitle />
      <Card>
        <div style={{ textAlign: "center" }}>
          <Image
            width={150}
            preview={false}
            src={dreams}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <Title
          level={3}
          style={{
            marginBottom: "10px",
            textAlign: "center",
            color: "#17a2b8",
          }}
        >
          PEPFAR MER 2.6.1 Indicador Semi-Annual AGYW_PREV
        </Title>
        <Card
          title="Parâmetros do Indicador AGYW_PREV "
          bordered={false}
          headStyle={{ color: "#17a2b8" }}
          style={{ color: "#17a2b8", marginLeft: "35%", marginRight: "20%" }}
        >
          <div style={{}}>
            <Form form={form} layout="vertical">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="provinces"
                    label="Provincias"
                    rules={[{ required: true, message: RequiredFieldMessage }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Seleccione as Províncias"
                      onChange={onChangeProvinces}
                    >
                      {provinces?.map((item) => (
                        <Option key={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="districts"
                    label="Distritos"
                    rules={[{ required: true, message: RequiredFieldMessage }]}
                  >
                    <Select
                      mode="multiple"
                      disabled={districts == undefined}
                      onChange={onChangeDistricts}
                    >
                      {districts?.map((item) => (
                        <Option key={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="initialDate" label="Data Inicial">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={(e) => {
                          setInitialDate(e);
                        }}
                      />
                    </Space>
                  </Form.Item>

                  <Form.Item name="finalDate" label="Data Final">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={(e) => {
                          setFinalDate(e);
                        }}
                      />
                    </Space>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleFetchData}
                    >
                      Preview
                    </Button>
                    <Button onClick={handleGenerateXLSXReport}>Download</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </Card>
      {<LoadingModal modalVisible={dataLoading} />}
    </Fragment>
  );
};

export default ReportAgyw;
