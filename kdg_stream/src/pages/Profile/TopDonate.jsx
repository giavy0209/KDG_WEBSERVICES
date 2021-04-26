import { useMemo, useState } from 'react';
import callAPI from '../../axios';
import { AssetBox, Table } from '../../components';
import { useLanguageLayerValue } from '../../context/LanguageLayer';

export default function TopDonate () {
    const [{ language, profile }] = useLanguageLayerValue();
    const [TopDonate , setTopDonate] = useState([])

    useMemo(() => {
        callAPI.get('/top_donate').then(res => {
            setTopDonate([...res.data])
        })
    },[])

    const storageHead = useMemo(() => {
        return [
            {
              key: 'from',
              name: profile[language].nickname,
              render: from => from.email
            },
            {
              key: 'value',
              name: profile[language].total_kdg,
            },
        ];
      }, [language, profile]);
    return (
        <>
            <AssetBox collapse={false} title=''>
                <Table dataHead={storageHead} dataBody={TopDonate}/>
            </AssetBox>
        </>
    )
}