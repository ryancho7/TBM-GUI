import styles from "./page.module.css";
import CircularMeter from "../components/CircularMeter";
const Motors = () => {
  const motors = [
    {name: 'Front', status: 'green', rpm: 1000, temp: 20}, 
    {name: 'Back', status: 'yellow', rpm: 800, temp: 40},
    {name: 'Top', status: 'red', rpm: 750, temp: 30},
    {name: 'Core', status: 'green', rpm: 1200, temp: 50},
  ];
  
  const renderMotorDetail = (name, key, temp, rpm, status) => {
    return(
        <div className={styles.motorDetail} key={key}>
            <div className={styles.title}>{name}</div>
            <div className={styles.circleContainer}>
              <CircularMeter min={0} max={5000} data={rpm} partitions={10} />
            </div>
            <div>Status: </div>
            <div>insert status informations</div>

            <div style={{marginTop: '50px'}}>insert other information</div>
        </div>
    );
    
  }
  return (
    <div>
        <h1 className={styles.title}>Motors</h1>
        <div className={styles.container}>
            {motors.map((motor, index) => 
                renderMotorDetail(motor.name, index, motor.temp, motor.rpm, motor.status))
            }
        </div>
        

    
      
    </div>
  );
}

export default Motors;