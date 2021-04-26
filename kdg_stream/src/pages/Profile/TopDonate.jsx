import { useMemo, useState } from 'react';
import callAPI from '../../axios';
import { AssetBox, Table } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';

export default function TopDonate() {
  const [{ language, profile }] = useLanguageLayerValue();
  const [TopDonate, setTopDonate] = useState([]);

  useMemo(() => {
    callAPI.get('/top_donate').then(res => {
      setTopDonate([...res.data]);
    });
  }, []);

  const storageHead = useMemo(() => {
    return [
      {
        key: 'from',
        name: profile[language].nickname,
        render: from => from.email,
      },
      {
        key: 'value',
        name: profile[language].total_kdg,
      },
    ];
  }, [language, profile]);

  return (
    <>
      <AssetBox collapse={false}>
        <div className='profile__table pt-20 pb-20 pl-30 pr-30'>
          <Table dataHead={storageHead} dataBody={TopDonate} />
        </div>
      </AssetBox>
    </>
  );
}
