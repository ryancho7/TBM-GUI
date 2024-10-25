"use client";
import styles from "./page.module.css";
import CircularMeter from "./components/CircularMeter";
import QuickStatus from "./components/QuickStatus";
import IntegrityMeter from "./components/IntegrityMeter";
import Status from "./components/status";
import { useState } from 'react';
export default function Home() {
  const motors = [
    {name: 'Front', status: 'green', rpm: 1000, temp: 20}, 
    {name: 'Back', status: 'yellow', rpm: 800, temp: 40},
    {name: 'Top', status: 'red', rpm: 750, temp: 30},
    {name: 'Core', status: 'green', rpm: 1200, temp: 50},
  ];
  
  const [machineIntegrity, setMachineIntegrity] = useState(79);
  const [cutterHeadStatus, setCutterHeadStatus] = useState("Running")
  const [motorTemp, setMotorTemp] = useState(20);
  const [circuitTemp, setCircuitTemp] = useState(18);
  const [data, setData] = useState(25);

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
        <div className={styles.statusContainer}>
          <div style={{marginRight: '20px'}}>Status:</div> 
          <Status color={'green'} description={cutterHeadStatus}/>
        </div>

        <div className={styles.temp}>
          <div className={styles.tempContainer}>
            <div className={styles.meterTitle}>Motor Temperature</div>
            <CircularMeter 
              min={0} max={50} data={data} partitions={10} units={"°C"} size={150}
              colorRanges={[
                { min: 0, max: 18, color: 'red' },      // Critical low
                { min: 18, max: 23, color: 'yellow' },  // Warning low
                { min: 23, max: 33, color: 'green' },   // Safe range
                { min: 33, max: 40, color: 'yellow' },  // Warning high
                { min: 40, max: 50, color: 'red' },     // Critical high
              ]}
            />
          </div>
          <div className={styles.tempContainer}>
            <div className={styles.meterTitle}>Circuit Temperature</div>
            <CircularMeter 
              min={0} max={50} data={data} partitions={10} units={"°C"} size={150}
              colorRanges={[
                { min: 0, max: 18, color: 'red' },      // Critical low
                { min: 18, max: 23, color: 'yellow' },  // Warning low
                { min: 23, max: 33, color: 'green' },   // Safe range
                { min: 33, max: 40, color: 'yellow' },  // Warning high
                { min: 40, max: 50, color: 'red' },     // Critical high
              ]}
            />          

          </div>
        </div>
        
        {/*
        {motors.map((motor, index) => (
          <QuickStatus 
            name={motor.name} 
            key={index} 
            temp={motor.temp} 
            rpm={motor.rpm}
            status={motor.status}
            />
        ))}
        */}
      </section>

      {/* Pump Section */}
      <section className={styles.pump}>
        <div className={styles.sectionTitle}>Pump</div>
        <div className={styles.statusContainer}>
          <div style={{marginRight: '20px'}}>Status:</div> 
          <Status color={'green'} description={cutterHeadStatus}/>
        </div>
        <div className={styles.tempContainer}>
            <div className={styles.meterTitle}>Flow Rate</div>
            <CircularMeter 
              min={0} max={50} data={data} partitions={10} units={"m3/s"} size={150}
              colorRanges={[
                { min: 0, max: 18, color: 'red' },      // Critical low
                { min: 18, max: 23, color: 'yellow' },  // Warning low
                { min: 23, max: 33, color: 'green' },   // Safe range
                { min: 33, max: 40, color: 'yellow' },  // Warning high
                { min: 40, max: 50, color: 'red' },     // Critical high
              ]}
            />
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={0}
            max={50}
            value={data}
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <div className={styles.sliderValue}>{data}</div>
        </div>
      </section>


      {/* Status Section */}
      <section >
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
