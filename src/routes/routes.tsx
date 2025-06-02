import Collaborator from "../pages/Collaborator";
import Home from "../pages/Home";
import SignIn from "../pages/signIn";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./private.routes";
import AdminPage from "../pages/admin";
import ComponentQuiz from "../pages/admin/Components/quiz/createQuiz";
import CreateUsersModal from "../pages/admin/Components/crudUsers/crudUsers";
import ResultUsers from "../pages/admin/Components/resultUsers/resultUsers";
import Candidate from "../pages/Candidate";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/:id" element={<SignIn />} />

      {/* Rota protegida */}
      <Route
        path="/collaborator"
        element={
          <PrivateRoute>
            <Collaborator />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-quiz"
        element={
          <PrivateRoute>
            <ComponentQuiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-users"
        element={
          <PrivateRoute>
            <CreateUsersModal />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-users-performance"
        element={
          <PrivateRoute>
            <ResultUsers />
          </PrivateRoute>
        }
      />
            <Route
        path="/candidate-dashboard"
        element={
          <PrivateRoute>
            <Candidate />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
