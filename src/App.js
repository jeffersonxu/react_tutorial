import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from './utilities/firebase';
import Banner from './components/Banner'
import CourseList from './components/CourseList'
import CourseForm from './components/CourseForm';

function Main() {
  const [data, isLoading, error] = useDbData("/");
  console.log(data)

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div className="container main">
      <Banner title={data.title}></Banner>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList courses={data.courses} />} />
          <Route path="/course/:id" element={<CourseForm courses={data.courses} />} />            
        </Routes>
      </BrowserRouter>
    </div>  )
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Main />      
    </QueryClientProvider>
  );
}

export default App;