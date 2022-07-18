import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Steps, Row, Col, Input, message, Space, Form, Tabs, Modal, DatePicker, Checkbox, Select, Radio, Divider } from 'antd';
import { allProvinces, queryDistrictsByProvinces, queryLocalitiesByDistricts, queryNeighborhoodsByLocalities } from '@app/utils/locality';
import './index.css';
import moment from 'moment';
import { query } from '@app/utils/users';

const { Option } = Select;
const { Step } = Steps;

const StepDadosPessoais = ({ form, beneficiary }: any) => {
    const [isDateRequired, setIsDateRequired] = useState<any>(true);
    const [user, setUser] = useState<any>(undefined);
    const [provinces, setProvinces] = useState<any>([]);
    const [districts, setDistricts] = useState<any>(undefined);
    const [localities, setLocalities] = useState<any>(undefined);
    const [neighborhoods, setNeighborhoods] = useState<any>(undefined);

    let userEntryPoint = localStorage.getItem('entryPoint');

    const RequiredFieldMessage = "Obrigatório!";
    const Idades = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

    useEffect(() => {
        const fetchData = async () => {
            const loggedUser = await query(localStorage.user);
            const dataProvinces = loggedUser.provinces.length > 0 ? loggedUser.provinces : await allProvinces();
            let dataDistricts;
            let dataLocalities;

            if (loggedUser.districts.length > 0) {
                dataDistricts = loggedUser.districts;
                setDistricts(dataDistricts)
            }
            else {
                const pIds = dataProvinces.map(item => {
                    return item.id + ''
                });
                dataDistricts = await queryDistrictsByProvinces({ provinces: pIds });
                setDistricts(dataDistricts);
            }

            if (loggedUser.localities > 0) {
                dataLocalities = loggedUser.localities;
                setLocalities(dataLocalities);
            }
            else {
                const dIds = dataDistricts.map(item => {
                    return item.id + ''
                });
                dataLocalities = await queryLocalitiesByDistricts({ districts: dIds });
                setLocalities(dataLocalities);
            }

            if (loggedUser.neighborhoods > 0) {
                setNeighborhoods(loggedUser.neighborhoods);
            }
            else {
                const lIds = dataLocalities.map(item => {
                    return item.id + ''
                });
                const dataNeighborhood = await queryNeighborhoodsByLocalities({ localities: lIds });
                setNeighborhoods(dataNeighborhood);
            }

            setUser(loggedUser);
            setProvinces(dataProvinces);
        };
        
        fetchData().catch(error => console.log(error));
    }, [beneficiary]);

    const onChangeProvinces = async (values: any) => {
        if (values.length > 0) {
            const dataDistricts = await queryDistrictsByProvinces({ provinces: [values + ""] });
            setDistricts(dataDistricts);
        }
    }

    const onChangeDistricts = async (values: any) => {
        if (values.length > 0) {
            const dataLocalities = await queryLocalitiesByDistricts({ districts: [values + ""] });
            setLocalities(dataLocalities);
        }

    }

    const onChangeLocality = async (values: any) => {
        if (values.length > 0) {
            const dataNeighborhood = await queryNeighborhoodsByLocalities({ localities: [values + ""] });
            setNeighborhoods(dataNeighborhood);
        }

    }

    const onChangeCheckbox = (e) => {
        setIsDateRequired(!e.target.checked);
    }

    return (
        <>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="surname"
                        label="Apelido"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.surname}
                    >
                        <Input placeholder="Insira o apelido" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="name"
                        label="Nome"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.name}
                    >
                        <Input placeholder="Insira o nome" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Row >
                        <Col span={10}>
                            <Form.Item
                                name="date_of_birth"
                                label="Data Nascimento"
                                rules={[{ required: isDateRequired, message: RequiredFieldMessage }]}
                                initialValue={beneficiary ? moment(beneficiary?.dateOfBirth,'YYYY-MM-DD') : ''}
                            >
                                <DatePicker disabled={!isDateRequired} style={{ width: '100%' }} placeholder="Selecione a data" />
                            </Form.Item>
                        </Col>
                        <Col span={14}>
                            <Checkbox style={{ marginTop: '30px' }} onChange={onChangeCheckbox} > <span style={{ color: '#008d4c', fontWeight: 'normal' }}>Não Conhece a Data de Nascimento</span> </Checkbox>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="age"
                        label="Idade (em anos)"
                        rules={[{ required: !isDateRequired, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.age}
                    >
                        <Select disabled={isDateRequired} placeholder="Seleccione a Idade" >
                            {Idades.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="nationality"
                        label="Nacionalidade"
                        initialValue={beneficiary ? beneficiary?.nationality+'' : '1'}
                    >
                        <Select placeholder="Seleccione a Nacionalidade" >
                            <Option key='1'>{"Moçambicana"}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        name="enrollment_date"
                        label="Data Inscrição"
                        rules={[{ required: isDateRequired, message: RequiredFieldMessage }]}
                        initialValue={beneficiary && beneficiary.enrollmentDate ? moment(beneficiary?.enrollmentDate,'YYYY-MM-DD') : ''}
                    >
                        <DatePicker disabled={!isDateRequired} style={{ width: '100%' }} placeholder="Selecione a data" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="province"
                        label="Provincia"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.neighborhood.locality.district.province.id.toString()}
                    >
                        <Select placeholder="Seleccione a Provincia" onChange={onChangeProvinces}>
                            {provinces?.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="district"
                        label="Distrito"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.neighborhood.locality.district.id.toString()}
                    >
                        <Select placeholder="Seleccione o Distrito" 
                                disabled={districts == undefined && beneficiary == undefined}
                                onChange={onChangeDistricts}
                        >
                            {districts?.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="locality"
                        label="Posto Administrativo"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.neighborhood.locality.id.toString()}
                    >
                        <Select placeholder="Seleccione o Posto Administrativo" 
                            disabled={localities == undefined && beneficiary == undefined}
                            onChange={onChangeLocality}
                        >
                            {localities?.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="entry_point"
                        label="Ponto de Entrada"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.entryPoint}
                    >
                        <Radio.Group defaultValue={userEntryPoint} buttonStyle="solid">
                            <Radio.Button value="1">US</Radio.Button>
                            <Radio.Button value="2">CM</Radio.Button>
                            <Radio.Button value="3">ES</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="nick_name"
                        label="Alcunha"
                        initialValue={beneficiary?.nickName}
                    >
                        <Input placeholder="Insira a alcunha" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="address"
                        label="Endereço (Ponto de Referência)"
                        initialValue={beneficiary?.address}
                    >
                        <Input placeholder="Insira a morada" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="phone_number"
                        label="Telemóvel"
                        initialValue={beneficiary?.phoneNumber}
                    >
                        <Input placeholder="Insira o Telemóvel" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="e_mail"
                        label="E-mail"
                        initialValue={beneficiary?.email}
                    >
                        <Input placeholder="Insira o E-mail" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="neighbourhood_id"
                        label="Bairro"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        initialValue={beneficiary?.neighborhood.id.toString()}
                    >
                        <Select placeholder="Seleccione o Bairro"  
                            disabled={neighborhoods == undefined && beneficiary == undefined}
                        >
                            {neighborhoods?.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}
export default StepDadosPessoais;