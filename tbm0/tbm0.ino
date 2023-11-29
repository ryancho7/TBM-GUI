// The following is the control for tunnel boring machine 0. It involves interfacing with 2 motor drivers:
// one for the operation of left and right wheels, and one for the control of the cutterhead

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

}

void loop() {
  // put your main code here, to run repeatedly:

}
