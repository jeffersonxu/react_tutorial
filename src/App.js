import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Banner from './components/Banner'
import CourseList from './components/CourseList'

function Main() {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div className="container main">
      <Banner title={data.title}></Banner>
      <CourseList courses={data.courses}></CourseList>
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