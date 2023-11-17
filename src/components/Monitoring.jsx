import { useEffect, useState } from 'react';
import Parameter from './Parameter';
import { onSnapshot, collection, getDoc } from 'firebase/firestore';

import db from '../firebase/config';

const initSpeedometer = {
  bod: 0,
  cod: 0,
  ct: 0,
  depeth: 0,
  do_: 0,
  id: '',
  n: 0,
  no2: 0,
  no3_3: 0,
  orp: 0,
  ph: 0,
  temperature: 0,
  time: '',
  tss: 0,
  tur: 0,
  uuid: '',
};
function Monitoring() {
  const id = '240305005225030';
  let [storedValues, setStoredValues] = useState([]);
  const fetchdata = async () => {
    await getDoc(collection(db, 'watermonitoring')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
      setStoredValues(newData);
    });
  };

  const stationCollectionRef = collection(db, `watermonitoring`);
  const [dataMonitoring, setDataMonitoring] = useState(initSpeedometer);

  useEffect(() => {
    const unsub = onSnapshot(stationCollectionRef, (snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      const filterById = data.filter((val) => val.uuid === id);
      if (filterById.length > 0) {
        setDataMonitoring(filterById[0]);
      }
    });
    return () => unsub();
  }, [id, stationCollectionRef]);

  return (
    <div>
      <div className='p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-10'>
        <Parameter
          name='Temperature'
          value={dataMonitoring.temperature.toFixed(2)}
          satuan={`\u00B0C`}
          time={dataMonitoring.time}
        />
        <Parameter
          name='DO'
          value={dataMonitoring.do_.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='Turbidity'
          value={dataMonitoring.tur.toFixed(2)}
          satuan='NTU'
          time={dataMonitoring.time}
        />
        <Parameter
          name='TDS'
          value={dataMonitoring.ct.toFixed(2)}
          satuan='ppm'
          time={dataMonitoring.time}
        />
        <Parameter
          name='pH'
          value={dataMonitoring.ph.toFixed(2)}
          satuan='pH'
          time={dataMonitoring.time}
        />
        <Parameter
          name='BOD'
          value={dataMonitoring.bod.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='COD'
          value={dataMonitoring.cod.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='TSS'
          value={dataMonitoring.tss.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='Amonia'
          value={dataMonitoring.n.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='Nitrat'
          value={dataMonitoring.no3_3.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='ORP'
          value={dataMonitoring.orp.toFixed(2)}
          satuan='Mv'
          time={dataMonitoring.time}
        />
        <Parameter
          name='Nitrit'
          value={dataMonitoring.no2.toFixed(2)}
          satuan='mg/L'
          time={dataMonitoring.time}
        />
        <Parameter
          name='Kedalaman'
          value={dataMonitoring.depeth.toFixed(2)}
          satuan='M'
          time={dataMonitoring.time}
        />
      </div>
    </div>
  );
}

export default Monitoring;
