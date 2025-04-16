// src/assets/animations/index.ts
import teacher  from '../../../../public/lottieanimation/Animation - 1744782886622.json';
import student from '../../../../public/lottieanimation/student.json'

const animations = {
    teacher,
  student,
};

export type LottieKey = keyof typeof animations;

export default animations;
