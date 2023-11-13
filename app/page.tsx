// import ClientSideDataTable from "@/app/components/ClientSideDataTable";
// import ClientSideDataGrid from "@/app/components/ClientSideDataGrid";
// import ClientSideLazyTable from "@/app/components/ClientSideLazyTable";
import ClientSideReactTable from "@/app/components/ClientSideReactTable/ClientSideReactTable";
import { RegistrationData } from "@/app/types";
import { promises as fs } from 'fs';

const fetchRegistrationData = async ()=>{
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data:RegistrationData[] = JSON.parse(file);
  return data;
}

export default async function Home() {
  const strData = await fetchRegistrationData();

  return (
    <main className='flex justify-center items-center flex-col gap-10'>
      <h1 className="text-2xl m-5">Short Term Rental License Registration Details</h1>
      <ClientSideReactTable registrationList={strData} />
    </main>
  )
}
