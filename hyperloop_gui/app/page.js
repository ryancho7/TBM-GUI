"use client";
import styles from "./page.module.css";
import CircularMeter from "./components/CircularMeter";
import QuickStatus from "./components/QuickStatus";
import IntegrityMeter from "./components/IntegrityMeter";
import Status from "./components/status";
import { useState, useEffect } from 'react';
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
  const [circuitTemp, setCircuitTemp] = useState(20);
  const [data, setData] = useState(25);

  const handleSliderChange = (event) => {
    setData(Number(event.target.value));
  };

  useEffect(() => {
    // Step 1: Connect to the WebSocket server
    const socket = new WebSocket('ws://localhost:5000'); // Adjust URL if necessary

    // Step 2: Handle incoming WebSocket messages
    socket.onmessage = function (event) {
      console.log(event);
      const data = JSON.parse(event.data); // Parse the JSON data
      const newMotorTemp = data.motor_temp.value;
      if(newMotorTemp){
        setMotorTemp(Math.floor(newMotorTemp * 100) / 100);
      }
      const newCircuitTemp = data.circuit_temp.value;
      if(newCircuitTemp){
        setCircuitTemp(Math.floor(newCircuitTemp * 100) / 100);
      }
      const newFlow = data.flow.value;
      if(newFlow){
        setData(Math.floor(newFlow * 100) / 100);
      }
    };

    // Step 3: Handle WebSocket connection close
    socket.onclose = function () {
      console.log('WebSocket connection closed');
    };

    // Step 4: Clean up WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

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
              id={0} min={0} max={50} data={motorTemp} partitions={10} units={"°C"} size={150}
              colorRanges={[
                { min: 0, max: 11, color: 'red' },      // Critical low
                { min: 11, max: 20, color: 'yellow' },  // Warning low
                { min: 20, max: 30, color: 'green' },   // Safe range
                { min: 30, max: 40, color: 'yellow' },  // Warning high
                { min: 40, max: 50, color: 'red' },     // Critical high
              ]}
            />
          </div>
          <div className={styles.tempContainer}>
            <div className={styles.meterTitle}>Circuit Temperature</div>
            <CircularMeter 
              id={1} min={0} max={50} data={circuitTemp} partitions={10} units={"°C"} size={150}
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
              id={2} min={0} max={50} data={data} partitions={10} units={"L/min"} size={150}
              colorRanges={[
                { min: 0, max: 9, color: 'red' },      // Critical low
                { min: 9, max: 23, color: 'yellow' },  // Warning low
                { min: 23, max: 33, color: 'green' },   // Safe range
                { min: 33, max: 40, color: 'yellow' },  // Warning high
                { min: 40, max: 50, color: 'red' },    // Critical high
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
