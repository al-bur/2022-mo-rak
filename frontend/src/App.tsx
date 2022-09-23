import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PrivateRoute } from './routes/PrivateRoute';
import { MenuRoute } from './routes/MenuRoute';
import SidebarLayout from './components/SidebarLayout/SidebarLayout';

const PollMainPage = lazy(() => import('./pages/PollMainPage/PollMainPage'));
const PollCreatePage = lazy(() => import('./pages/PollCreatePage/PollCreatePage'));
const PollProgressPage = lazy(() => import('./pages/PollProgressPage/PollProgressPage'));
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const PollResultPage = lazy(() => import('./pages/PollResultPage/PollResultPage'));
const GroupInitPage = lazy(() => import('./pages/GroupInitPage/GroupInitPage'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const InvitationPage = lazy(() => import('./pages/InvitationPage/InvitationPage'));
const AppointmentMainPage = lazy(() => import('./pages/AppointmentMainPage/AppointmentMainPage'));
const AppointmentCreatePage = lazy(
  () => import('./pages/AppointmentCreatePage/AppointmentCreatePage')
);
const AppointmentProgressPage = lazy(
  () => import('./pages/AppointmentProgressPage/AppointmentProgressPage')
);
const AppointmentResultPage = lazy(
  () => import('./pages/AppointmentResultPage/AppointmentResultPage')
);

function App() {
  return (
    // TODO: default 그룹을 찾는 요청을 해서 그룹이 있는 지 없는 지 확인하는 Route 생성? (PASS)
    // TODO: 로딩 UI 필요
    <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="invite/:invitationCode" element={<InvitationPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="init" element={<GroupInitPage />} />

            <Route element={<SidebarLayout />}>
              <Route path="groups/:groupCode">
                <Route element={<MenuRoute menu="main" />}>
                  <Route index element={<MainPage />} />
                </Route>

                <Route element={<MenuRoute menu="poll" />}>
                  <Route path="poll">
                    <Route index element={<PollMainPage />} />
                    <Route path="create" element={<PollCreatePage />} />
                    <Route path=":pollCode/progress" element={<PollProgressPage />} />
                    <Route path=":pollCode/result" element={<PollResultPage />} />
                  </Route>
                </Route>

                <Route element={<MenuRoute menu="appointment" />}>
                  <Route path="appointment">
                    <Route index element={<AppointmentMainPage />} />
                    <Route path="create" element={<AppointmentCreatePage />} />
                    <Route path=":appointmentCode/progress" element={<AppointmentProgressPage />} />
                    <Route path=":appointmentCode/result" element={<AppointmentResultPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<div>error</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
