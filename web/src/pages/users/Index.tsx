import { Card, Table, message, Button, Space, Badge, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import { query } from '../../utils/users';
import { UserModel } from '../../models/User';
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import UsersForm from './components/UsersForm';
import { add, edit } from '@app/utils/users';


const UsersList: React.FC = () => {
    const [ users, setUsers ] = useState<UserModel[]>([]);
    const [ usersModalVisible, setUsersModalVisible] = useState<boolean>(false);
    const [ selectedUser, setSelectedUser] = useState(undefined);
    const [form] = Form.useForm();
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const data = await query();
          setUsers(data);
        } 
    
        fetchData().catch(error => console.log(error));
    
    }, []);

    const handleUsersModalVisible = (flag?: boolean) => {
        setUsersModalVisible(!!flag);
    };

    const handleAdd = () => {
        form.validateFields().then(async (values) => {
            
            const user: any = {};

            user.surname = values.surname;
            user.name = values.name;
            user.phoneNumber = values.phoneNumber;
            user.phoneNumber2 = values.phoneNumber2;
            user.email = values.email;
            user.username = values.username;
            user.entryPoint = values.entryPoint;
            user.status = values.status;
            user.partners = { "id": values.partners };
            user.profiles = { "id": values.profiles };
            user.us = { "id": values.us };
            user.provinces = values.provinces.map(item => (
                { "id": item }
            ));
            user.districts = values.districts.map(item => (
                { "id": item }
            ));
            user.localities = values.localities.map(item => (
                { "id": item }
            ));

            const { data } =  await add(user);

            setUsers(users => [...users, data]);

            handleUsersModalVisible(false);
            
            message.success({
                content: 'Registado com Sucesso!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        })
        .catch(error => {
            message.error({
                content: 'Não foi possivel Registrar Utilizador!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        });

        
    }

    const columns = [
        { title: 'Tipo de Utilizador', dataIndex: '', key: 'type', 
            render: (text, record)  => record.profiles.description,
        },
        { title: 'Estado de Utilizador', dataIndex: '', key: 'status',
            render: (text, record) => (
            
                <Badge
                    className="site-badge-count-109"
                    count={record.status == 1 ? 'activo' : 'Inactivo'}
                    style={ record.status == 1 ? {backgroundColor: '#52c41a'} :
                                                {backgroundColor: '#f5222d'}
                }
                /> 
            ),
        },
        { title: 'Username', dataIndex: 'username', key: 'username'},
        { title: 'Nome de Utilizador', dataIndex: 'name', key: 'name'},
        { title: 'Ponto de Entrada', dataIndex: '', key: 'type', 
            render: (text, record)  => 
                (record.entryPoint==="1") ?
                    "Unidade Sanitaria"
                : 
                (record.entryPoint==="2") ? 
                    "Escola"
                : 
                    "Comunidade"                                            
            
        },
        { title: 'Parceiro', dataIndex: '', key: 'type', 
            render: (text, record)  => record.partners?.name,
        },
        { title: 'Email', dataIndex: 'email', key: 'email'},
        { title: 'Telefone', dataIndex: 'phoneNumber', key: 'phoneNumber'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
              <Space>
                <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate("/usersView", { state: { user: record } } )} >
                </Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => navigate("/usersForm", { state: { user: record } } )} >
                </Button>
              </Space>
            ),
        },
    ];

    
    return (
        <>
            <Card  bordered={false} style={{marginBottom:'10px', textAlign:"center", fontWeight:"bold", color:"#17a2b8"}} >
                SISTEMA INTEGRADO DE CADASTRO DE ADOLESCENTES E JOVENS
            </Card>
            <Card title="Lista de Utilizadores" bordered={false} headStyle={{color:"#17a2b8"}}
                extra={
                    <Space>
                      <Button type="primary" icon={<PlusOutlined />} onClick={()=>handleUsersModalVisible(true)}>
                        Adicionar Utilizador
                      </Button>
                    </Space>
                }
            >
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={users}
                    bordered
                />
            </Card>
            <UsersForm form={form} user={selectedUser} modalVisible={usersModalVisible} handleModalVisible={handleUsersModalVisible} handleAdd={handleAdd}/>
        </>
    );
}
export default UsersList;