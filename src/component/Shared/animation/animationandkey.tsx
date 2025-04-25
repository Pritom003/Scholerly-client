// src/assets/animations/index.ts
import teacher  from '../../../../public/lottieanimation/Animation - 1744782886622.json';
import student from '../../../../public/lottieanimation/student.json'
import studenmam from '../../../../public/lottieanimation/student-mam.lottie.json'
import loader from '../../../../public/lottieanimation/loader.json'

const animations = {
    teacher,
  student,studenmam ,loader
};

export type LottieKey = keyof typeof animations;

export default animations;
