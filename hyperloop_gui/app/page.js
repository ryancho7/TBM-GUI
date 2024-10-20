"use client";
import styles from "./page.module.css";
import CircularMeter from "./components/CircularMeter";
import QuickStatus from "./components/QuickStatus";
import IntegrityMeter from "./components/IntegrityMeter";
import { useState } from 'react';
export default function Home() {
  const motors = [
    {name: 'Front', status: 'green', rpm: 1000, temp: 20}, 
    {name: 'Back', status: 'yellow', rpm: 800, temp: 40},
    {name: 'Top', status: 'red', rpm: 750, temp: 30},
    {name: 'Core', status: 'green', rpm: 1200, temp: 50},
  ];
  
  const [machineIntegrity, setMachineIntegrity] = useState(79);
  const [data, setData] = useState(0);

  const handleSliderChange = (event) => {
    setData(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div style={{height: '30px', width: '200px'}}>
          <IntegrityMeter integrity={machineIntegrity} green={80} yellow={60}/>
        </div>
        <button className={styles.stopButton}>STOP</button>
      </header>

      {/* Cutterhead Section */}
      <section className={styles.motors}>
        <div className={styles.sectionTitle}>Cutter Head</div>
        <div className={styles.sectionContent}>
          <section>
            <div>RPM</div>
            <div style={{height: '250px', width: '250px'}}>
              <CircularMeter min={0} max={200} data={data} partitions={10}/>
            </div>
            
          </section>
        </div>
        {motors.map((motor, index) => (
          <QuickStatus 
            name={motor.name} 
            key={index} 
            temp={motor.temp} 
            rpm={motor.rpm}
            status={motor.status}
            />
        ))}
      </section>

      {/* Pump Section */}
      <section className={styles.propulsion}>
        <div>
          <h1>Speedometer Example</h1>
          <CircularMeter min={0} max={200} data={data} partitions={10} />
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={0}
            max={200}
            value={data}
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <div className={styles.sliderValue}>{data}</div>
        </div>
      </section>


      {/* Status Section */}
      <section className={styles.status}>
        <div className={styles.sectionTitle}>Status</div>
        <div className={styles.statusIndicator}>
          <div className={`${styles.statusItem} ${styles.alert}`}>
            <p>Explosive/Flammable Gases</p>
            <p>8.0</p>
          </div>
          <div className={styles.statusItem}>
            <p>Communication</p>
          </div>
          <div className={styles.statusItem}>
            <p>Power</p>
          </div>
        </div>
      </section>
    </div>
  );
}