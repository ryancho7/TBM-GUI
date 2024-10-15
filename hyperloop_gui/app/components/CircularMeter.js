"use client";
import { useEffect, useState } from 'react';
import styles from './CircularMeter.module.css';

const CircularMeter = ({ min, max, data, partitions }) => {
    // Calculate the proportion of the meter based on the current data
    const proportion = ((data - min) / (max - min));
    console.log(min + " " + max + " " + data)

    // Convert the percentage to the stroke-dashoffset for the SVG circle
    const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle

    // Arc is 240 degrees (2/3 of the full circle)
    // Generate labels
    const totalLabels = partitions + 1; // Including min and max
    const labels = [];

    for (let i = 0; i < totalLabels; i++) {
        const labelProportion = i / (totalLabels - 1); // totalLabels - 1 intervals
        const value = min + labelProportion * (max - min);
        const angle = 150 + 240 * labelProportion; // from -120 to +120 degrees
        labels.push({ value, angle });
    }

    // Calculate the angle for the needle
    const needleAngle = -120 + 240* proportion; // angle in degrees, lines start at noon
    const needleAngleRad = (needleAngle - 90) * (Math.PI / 180); // Adjust for SVG coordinate system

    // Needle coordinates
    const needleLength = 50; // length of the needle from the center
    const needleInnerLength = 20; // start point of the needle from the center
    const needleX1 = 50 + needleInnerLength * Math.cos(needleAngleRad);
    const needleY1 = 50 + needleInnerLength * Math.sin(needleAngleRad);
    const needleX2 = 50 + needleLength * Math.cos(needleAngleRad);
    const needleY2 = 50 + needleLength * Math.sin(needleAngleRad);

    return (
        <div className={styles.meterContainer}>
            <svg viewBox="0 0 100 100">
                {/*background circle */}
                <circle
                    className={styles.meterBackground}
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                        strokeDasharray: `${circumference * (2 / 3)}`, // Display only the 240 degrees arc
                        transform: "rotate(150deg)", // Rotate to make it start at 8 o'clock (stroke starts on x axis, at 90 degrees from noon)
                        transformOrigin: "50% 50%", // Rotate around the center
                    }}
                ></circle>
                
                {/* Needle */}
                <line
                    x1={needleX1}
                    y1={needleY1}
                    x2={needleX2}
                    y2={needleY2}
                    stroke="red"
                    strokeWidth="2"
                />
                <g className={styles.labels}>
                    {labels.map((label, index) => {
                        const angleRad = (label.angle) * Math.PI / 180;
                        const x1 = 50 + 40 * Math.cos(angleRad); // inner radius for ticks
                        const y1 = 50 + 40 * Math.sin(angleRad);
                        const x2 = 50 + 50 * Math.cos(angleRad); // outer radius for ticks
                        const y2 = 50 + 50 * Math.sin(angleRad);
                        const xText = 50 + 35 * Math.cos(angleRad); // text position
                        const yText = 50 + 35 * Math.sin(angleRad);

                        return (
                            <g key={index}>
                                {/* Line (tick mark) */}
                                <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="black"
                                    strokeWidth="0.5"
                                />
                                {/* Text label */}
                                <text
                                    x={xText}
                                    y={yText}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="5"
                                    //transform={`rotate(${90}, ${xText}, ${yText})`}
                                >
                                    {Math.round(label.value)}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
            <div className={styles.dataDisplay}>
                <div className={styles.dataValue}>{data}</div>
            </div>
        </div>
    );
};

export default CircularMeter;
