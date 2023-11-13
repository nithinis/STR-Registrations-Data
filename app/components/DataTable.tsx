import React from 'react'
import { promises as fs } from 'fs';

const fetchRegistrationData = async()=>{
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
    const data = JSON.parse(file);
    return data;
}

const DataTable = async () => {
    const strData = await fetchRegistrationData();

  return (
    <section>
        <div>STR Registration Data</div>
        <table className='table'>
            <thead>
                <tr>
                    <th>operator_registration_number</th>
                    <th>postal_code</th>
                    <th>ward_number</th>
                    <th>ward_name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </section>
  )
}

export default DataTable