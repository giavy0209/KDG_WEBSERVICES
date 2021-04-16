import React from 'react';
import '../../assets/css/table.css';

const Table = ({ dataHead, dataBody }) => {
    console.log(dataHead);
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
                        {
                            dataHead.map(o => 
                            <td 
                            style={o.width ? {width : o.width} : {}}
                            onClick={typeof o.onClick === 'function' ? o.onClick(obj[o.key] , obj, dataBody) : ()=>{}}
                            key={o.key}>
                                {
                                    typeof o.render === 'function' ? 
                                    o.render(obj[o.key] , obj, dataBody)
                                    :
                                    obj[o.key]
                                }
                            </td> 
                            )
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default Table;
