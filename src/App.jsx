import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './component/PrivateRoute';
import Login from './auth/Login';
import FormSubmit from './pages/FormSubmit';
import FormBuilder from './pages/FormBuilder';
import { store } from './store';
import FormList from './pages/FormList';
import FormResponse from './pages/FormResponse';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FormSubmit />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/form-builder"
            element={
              <PrivateRoute>
                <FormBuilder />
              </PrivateRoute>
            }
          />
           <Route
            path="/form-List"
            element={
              <PrivateRoute>
                <FormList/>
              </PrivateRoute>
            }
          />
           <Route
            path="/form-Response/:formId"
            element={
              <PrivateRoute>
                <FormResponse/>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
