export const PART = {
  DISABLED: 0,
  FACE: 1,
  EYES: 2,
  LEFT_EYE: 3,
  RIGHT_EYE: 4,
  MOUTH: 5,
} as const;

export const LOOK_EYES = {
  NEUTRAL: 1,
  CLOSED: 2,
  PARTIALLY_CLOSED: 3,
  PARTIALLY_OPEN: 4,
  SLIGHT_LEFT: 5,
  LEFT: 6,
  REAL_LEFT: 7,
  SLIGHT_RIGHT: 8,
  RIGHT: 9,
  REAL_RIGHT: 10,
} as const;

export const LOOK_LEFT_EYE = {
  NEUTRAL: 1,
  CLOSED: 2,
  PARTIALLY_CLOSED: 3,
  PARTIALLY_OPEN: 4,
  SLIGHT_LEFT: 5,
  LEFT: 6,
  REAL_LEFT: 7,
  SLIGHT_RIGHT: 8,
  RIGHT: 9,
  REAL_RIGHT: 10,
} as const;

export const LOOK_RIGHT_EYE = {
  NEUTRAL: 1,
  CLOSED: 2,
  PARTIALLY_CLOSED: 3,
  PARTIALLY_OPEN: 4,
  SLIGHT_LEFT: 5,
  LEFT: 6,
  REAL_LEFT: 7,
  SLIGHT_RIGHT: 8,
  RIGHT: 9,
  REAL_RIGHT: 10,
} as const;

export const LOOK_MOUTH = {
  HAPPY: 1,
  SAD: 2,
  VERY_HAPPY: 3,
  PARTIALLY_OPEN: 4,
  NEUTRAL: 5,
  OPENED: 6,
} as const;

export const EXPRESSIONS = {
  NEUTRAL: [
    {
      look: PART.EYES,
      part: LOOK_EYES.NEUTRAL,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.NEUTRAL,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.NEUTRAL,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.NEUTRAL,
    },
  ],
  HAPPY: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_CLOSED,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.NEUTRAL,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.NEUTRAL,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.HAPPY,
    },
  ],
  SAD: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.PARTIALLY_OPEN,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.PARTIALLY_OPEN,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.SAD,
    },
  ],
  SURPRISED: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.NEUTRAL,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.NEUTRAL,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.PARTIALLY_OPEN,
    },
  ],
  ANGRY: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_CLOSED,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.NEUTRAL,
    },
  ],
  DISGUSTED: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_CLOSED,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.SAD,
    },
  ],
  FEARFUL: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.PARTIALLY_OPEN,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.PARTIALLY_OPEN,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.SAD,
    },
  ],
  CONFUSED: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.SLIGHT_LEFT,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.SLIGHT_RIGHT,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.PARTIALLY_OPEN,
    },
  ],
  CONCENTRATED: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.SLIGHT_RIGHT,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.SLIGHT_LEFT,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.PARTIALLY_OPEN,
    },
  ],
  SURPRISE: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_OPEN,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.SLIGHT_LEFT,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.SLIGHT_RIGHT,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.PARTIALLY_OPEN,
    },
  ],
  DISGUST: [
    {
      look: PART.EYES,
      part: LOOK_EYES.PARTIALLY_CLOSED,
    },
    {
      look: PART.LEFT_EYE,
      part: LOOK_LEFT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.RIGHT_EYE,
      part: LOOK_RIGHT_EYE.PARTIALLY_CLOSED,
    },
    {
      look: PART.MOUTH,
      part: LOOK_MOUTH.SAD,
    },
  ],
};
