import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import CustomerForm from './CustomerData/customerFrom';
import { useNavigate } from 'react-router-dom';


function App(){

const navigate = useNavigate();
const handleBackClick = () => {
  navigate('/customer-list')
}

  return (
    <div className="container-fluid">
      
      <header className="bg-dark text-white text-center py-3">
        <h1> Customer Information Form  </h1>
        <button onClick={handleBackClick} type="button" class="btn btn-primary btn-lg custom-button"  > Customer List</button>
      </header>
      
     
      <div className="containers mt-4">
        <div className="form-background">
          <CustomerForm />
        </div>
      </div>
      
      
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p>&copy; 2024 pratikshasanam@gmail.com.</p>
      </footer>
    </div>
  );
}

export default App;
