import { Localized } from 'fluent-react/compat';
import * as React from 'react';
import { Goal } from 'common/goals';
import Props from '../props';

import './goals.css';

const Wave = () => (
  <svg width="160" height="70" viewBox="0 0 160 70">
    <defs>
      <linearGradient id="wave-b" x1="50%" x2="50%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#FF4F5E" stopOpacity="0" />
        <stop offset="100%" stopColor="rgba(0,0,0,.4)" />
      </linearGradient>
      <path
        id="wave-a"
        d="M0 45.229c21.074-18.809 28.61-2.594 54.87-2.594C83.025 42.635 86.378 21 111.59 21c27.04 0 29.061 20.902 48.41 24.229V91H0V45.229z"
      />
    </defs>
    <use
      fill="url(#wave-b)"
      fillRule="evenodd"
      opacity=".5"
      style={{ mixBlendMode: 'multiply' }}
      transform="matrix(-1 0 0 1 160 -21)"
      xlinkHref="#wave-a"
    />
  </svg>
);

const GoalBox = ({
  date,
  goal,
  isNext,
  type,
}: Goal & { isNext: boolean; type: string }) => (
  <div className={'goal-box ' + type + (date ? ' done' : '')}>
    {(date || isNext) && <Wave />}
    <div className="goal">{goal}</div>
    <hr />
    <Localized
      id={
        ({
          streaks: 'days',
          clips: 'recordings',
          votes: 'validations',
        } as any)[type]
      }
      $count={goal}>
      <div className="unit" />
    </Localized>
    {date && (
      <div className="date">
        {new Date(date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    )}
  </div>
);

const GoalsPage = ({ allGoals }: Props) => (
  <div className="goals">
    {Object.entries(allGoals || {}).map(
      ([type, [current, goals]]: [string, [number, Goal[]]]) => (
        <React.Fragment>
          <Localized
            id={({ clips: 'speak', votes: 'listen' } as any)[type] || type}>
            <h3 />
          </Localized>
          <div className="goal-boxes">
            {goals.map((goal, i) => (
              <GoalBox
                {...goal}
                type={type}
                isNext={(goals[i - 1] || ({} as any)).date}
              />
            ))}
          </div>
        </React.Fragment>
      )
    )}
  </div>
);

export default GoalsPage;
