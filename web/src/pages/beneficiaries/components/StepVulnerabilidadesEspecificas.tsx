import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Steps, Row, Col, Input, message, Space, Form, Tabs, Modal, DatePicker, Checkbox, Select, Radio, Divider } from 'antd';
import './index.css';
const { Option } = Select;
const { Step } = Steps;

const StepVulnerabilidadesEspecificas = ({ form, beneficiary }: any) => {
    const [gbvTypeEnabled, setGbvTypeEnabled] = useState<any>(true);
    const [gbvTimeEnabled, setGbvTimeEnabled] = useState<any>(true);

    const gbvVictimChange = async (values: any) => {
        setGbvTypeEnabled(values.target.value != 1);
        if (values.target.value != 1) {
            setGbvTimeEnabled(true);
        }
    }

    const gbvTypeChange = async (values: any) => {
        setGbvTimeEnabled(values == undefined);
    }

    const RequiredFieldMessage = "Obrigatório!";

    return (
        <>
            <Row gutter={24}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_sexually_active"
                        label="Sexualmente Activa?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltSexuallyActive}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_multiple_partners"
                        label="Relações Múltiplas e Concorrentes?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltMultiplePartners}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_is_migrant"
                        label="Migrante?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltIsMigrant}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_trafficking_victim"
                        label="Vítima de Tráfico?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltTraffickingVictim}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_sexual_exploitation"
                        label="Vítima de Exploração sexual?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltSexualExploitation}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_sexploitation_time"
                        label="Tempo"
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltSexploitationTime}
                    >
                       <Select
                            size='middle'
                            placeholder="Please select"
                            //defaultValue={['a10', 'c12']}
                            //onChange={handleChange}
                            style={{width: '100%',}}
                        >
                            {['+3 Dias','-3 Dias'].map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_vbg_victim"
                        label="Vítima de Violéncia Baseada no Gênero?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltVbgVictim}
                    >
                        <Radio.Group onChange={gbvVictimChange}>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_vbg_type"
                        label="Tipo de Violéncia"
                        rules={[{ required: !gbvTypeEnabled, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltVbgType}
                    >
                        <Select
                            size='middle'
                            placeholder="Please select"
                            disabled={gbvTypeEnabled}
                            //defaultValue={['a10', 'c12']}
                            onChange={gbvTypeChange}
                            style={{width: '100%',}}
                        >
                            {['Física','Sexual', 'Psicológica'].map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_vbg_time"
                        label="Tempo"
                        rules={[{ required: !gbvTimeEnabled, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltVbgTime}
                    >
                       <Select
                            size='middle'
                            placeholder="Please select"
                            disabled={gbvTimeEnabled}
                            //defaultValue={['a10', 'c12']}
                            //onChange={handleChange}
                            style={{width: '100%',}}
                        >
                            {['+3 Dias','-3 Dias'].map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_alcohol_drugs_use"
                        label="Uso de Álcool e Drogas?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltAlcoholDrugsUse}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_sti_history"
                        label="Histórico de ITS?"
                        rules={[{ required: true, message: RequiredFieldMessage }]}
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltStiHistory}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="vblt_sex_worker"
                        label="Trabalhadora do Sexo"
                        style={{ textAlign: 'left' }}
                        initialValue={beneficiary?.vbltSexWorker}
                    >
                        <Radio.Group>
                            <Radio.Button value={1}>SIM</Radio.Button>
                            <Radio.Button value={0}>NÃO</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}
export default StepVulnerabilidadesEspecificas;