import { head1 } from '../../mock/table'

const TableX = () => {
  return (
    <table className='tableX'>
      <thead>
        <tr>
          {head1.map(({ key, value }) => (
            <th key={key}>{value}</th>
          ))}
          {/* <th>Date</th>
          <th>Gift type</th>
          <th>Amount (KDG)</th> */}
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>13:00:00 - 24/04/2021</td>
          <td>Chocolate</td>
          <td>90</td>
        </tr>

        <tr>
          <td>13:00:00 - 24/04/2021</td>
          <td>Chocolate</td>
          <td>90</td>
        </tr>

        <tr>
          <td>13:00:00 - 24/04/2021</td>
          <td>Chocolate</td>
          <td>90</td>
        </tr>

        <tr>
          <td>13:00:00 - 24/04/2021</td>
          <td>Chocolate</td>
          <td>90</td>
        </tr>

        <tr>
          <td>13:00:00 - 24/04/2021</td>
          <td>Chocolate</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableX
