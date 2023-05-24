import {useEffect} from 'react';
import {Routes, Route, HashRouter} from 'react-router-dom';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import NewPassword from "@modules/new-password/NewPassword";
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
import Users from '@pages/users/Index';
import UsersForm from '@pages/users/Form';
import UserView from '@pages/users/View';
import BeneficiariesList from '@pages/beneficiaries';
import ReferenceList from '@pages/reference/Index';
import ProvinceList from '@pages/province/index';
import DistrictList from '@pages/district';
import LocalityList from './pages/locality';
import ServicesList from '@pages/services/index';
import SubServicesList from './pages/subservices';
import UsList from '@pages/us';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import RenewPassword from './modules/new-password/RenewPassword';
import OrganizationList from './pages/organization';
import ReportAgyw from './pages/report/agyw/ReportAgyw';
import PreviewAgyw from './pages/report/agyw/ReportPreview';
import { handleUserInteraction } from './store/reducers/event';


const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const eventsActive = useSelector((state:any)=> state.event.active)

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  useEffect(() => {
    const handleClick = (event) => {
      dispatch(handleUserInteraction('handleClick'))
    };

    const handleKeyboard = (event) => {
      dispatch(handleUserInteraction('handleUserInteraction'))
    }

    const handleFormSubmit = (event) => {
      dispatch(handleUserInteraction('handleUserInteraction'))
    };

    const handleScroll = (event) => {
      dispatch(handleUserInteraction('handleUserInteraction'))
    };

    // Add event listeners
    eventsActive && document.addEventListener('click', handleClick);
    eventsActive && document.addEventListener('keydown', handleKeyboard);
    eventsActive && document.addEventListener('submit', handleFormSubmit);
    eventsActive && document.addEventListener('scroll', handleScroll);
    
    // Clean up event listeners
    return () => {
      eventsActive && document.removeEventListener('click', handleClick);
      eventsActive && document.removeEventListener('submit', handleFormSubmit);
      eventsActive && document.removeEventListener('scroll', handleScroll);
      eventsActive && document.removeEventListener('keydown', handleKeyboard);
    };
  }, [eventsActive]);
 
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          // First login after user was create
          <Route path="/newPassword" element={<NewPassword />} />
          // Password Expired
          <Route path="/renewPassword" element={<RenewPassword />} />
          // Aplication Main
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
            // Rota de Beneficiaras
            <Route path="/beneficiariesList" element={<BeneficiariesList />} />
            //Rota de Referencias
            <Route path="/referenceList" element={<ReferenceList />} />
            // Rota para Utilizadores 
            <Route path="/usersList" element={<Users />} />
            <Route path="/usersForm" element={<UsersForm />} />
            <Route path="/usersView" element={<UserView />} />
            // Rota de Configurações
            <Route path="/provinceList" element={<ProvinceList />} />
            <Route path="/districtList" element={<DistrictList />} />
            <Route path="/localityList" element={<LocalityList />} />
            <Route path="/servicesList" element={<ServicesList />} />
            <Route path="/subServicesList" element={<SubServicesList />} />
            <Route path="/organizationsList" element={<OrganizationList />} />
            <Route path="/usList" element={<UsList />} />
            // Relatorios
            <Route path="/reportAgyw" element={<ReportAgyw />}/>
            <Route path="/previewAgyw" element={<PreviewAgyw />}/>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
