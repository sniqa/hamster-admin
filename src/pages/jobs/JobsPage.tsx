import { JobProvider } from "./JobContext";
import JobsTable from "./JobsTable";

const JobsPage = () => {
  return (
    <JobProvider>
      <JobsTable />
    </JobProvider>
  );
};

export default JobsPage;
