// Wheel pins
int leftWheel1 = 2;
int leftWheel2 = 3;
int rightWheel1 = 4;
int rightWheel2 = 7;
int wheelENA = 5;
int wheelENB = 6;
// Cutterhead pins
int cut1 = 8;
int cut2 = 11;
int cutENA = 9;

void setup() {
  pinMode(leftWheel1, OUTPUT);
  pinMode(leftWheel2, OUTPUT);
  pinMode(rightWheel1, OUTPUT);
  pinMode(rightWheel2, OUTPUT);
  pinMode(wheelENA, OUTPUT);
  pinMode(wheelENB, OUTPUT);
  pinMode(cut1, OUTPUT);
  pinMode(cut2, OUTPUT);
  pinMode(cutENA, OUTPUT);

  Serial.begin(9600);

}

void loop() {
  // Speed
  analogWrite(wheelENA, 255);

  // Forward
  digitalWrite(leftWheel1, HIGH);
  digitalWrite(leftWheel2, LOW);

}
