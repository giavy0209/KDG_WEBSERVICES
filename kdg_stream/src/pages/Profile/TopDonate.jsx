import { useMemo, useState } from 'react';
import callAPI from '../../axios';
import { AssetBox, Table } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { convertBalance } from '../../helpers';

export default function TopDonate() {
  const [{ language, profile }] = useLanguageLayerValue();
  const [TopDonateBody, setTopDonateBody] = useState([]);

  useMemo(() => {
    callAPI.get('/top_donate').then(res => {
      setTopDonateBody([...res.data]);
    });
  }, []);

  const topDonateHead = useMemo(() => {
    return [
      {
        key: '_id',
        name: 'No',
        style: {
          width: '25%',
        },
        render: (_id, obj, array, index) => index + 1,
      },
      {
        key: 'from',
        name: profile[language].nickname,
        style: {
          width: '40%',
        },
        render: from => from.email,
      },
      {
        key: 'value',
        name: profile[language].total_kdg,
        style: {
          width: '35%',
          color: '#f52871',
          fontWeight: '500',
        },
        render: value => (
          <div>
            {convertBalance(value)} <span style={{ color: '#303030', fontWeight: 500 }}> KDG</span>
          </div>
        ),
      },
    ];
  }, [language, profile]);

  return (
    <>
      <AssetBox collapse={false}>
        <div className='profile__table pt-20 pb-20 pl-30 pr-30'>
          <Table dataHead={topDonateHead} dataBody={TopDonateBody} />
        </div>
      </AssetBox>
    </>
  );
}
