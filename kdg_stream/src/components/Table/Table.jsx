import React from 'react';
import '../../assets/css/table.css';

const Table = ({ dataHead, dataBody }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          {dataHead.map(o => (
            <td key={o.key}>{o.name}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataBody.map((obj, i) => (
          <tr key={i}>
            {dataHead.map(o => (
              <td
                key={o.key}
                style={o.style || {}}
                onClick={
                  typeof o.onClick === 'function' ? o.onClick(obj[o.key], obj, dataBody) : () => {}
                }
              >
                {typeof o.render === 'function'
                  ? o.render(obj[o.key], obj, dataBody, i)
                  : obj[o.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
