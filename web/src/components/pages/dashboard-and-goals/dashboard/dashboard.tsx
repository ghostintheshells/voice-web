import * as React from 'react';
import Props from '../props';
import ContributionActivity from './contribution-activity';
import LeaderboardCard from './leaderboard-card';
import ProgressCard from './progress-card';
import StatsCard from './stats-card';

import './dashboard.css';

const Dashboard = ({ allGoals, locale }: Props) => (
  <div className="dashboard-page">
    <div className="cards">
      {['speak', 'listen'].map(type => {
        const [current, goals] = allGoals
          ? allGoals[type == 'speak' ? 'clips' : 'votes']
          : [null, null];
        return (
          <ProgressCard
            key={type + locale}
            type={type as any}
            locale={locale}
            personalCurrent={allGoals ? current : null}
            personalGoal={
              allGoals
                ? (goals.find(g => !g.date) || { goal: Infinity }).goal
                : null
            }
          />
        );
      })}
    </div>

    <div className="cards">
      <StatsCard
        key="contribution"
        title="contribution-activity"
        tabs={['you', 'everyone'].reduce(
          (o: any, from: any) => ({
            ...o,
            [from]: ({ locale }: { locale: string }) => (
              <ContributionActivity key={locale + from} {...{ from, locale }} />
            ),
          }),
          {}
        )}
      />
      <LeaderboardCard />
    </div>
  </div>
);

export default Dashboard;
