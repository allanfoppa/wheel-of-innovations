import React, { useEffect, useState } from "react";
import { HomeCallToAction } from "../components/HomeCTA/HomeCTA.component";

export const Home: React.FC = () => {

  const [ hasChallenges, setHasChallenge ] = useState(true);

  useEffect(() => {
    // TODO: Fetch challenges from API
    setHasChallenge(false);
  }, [])

  const OutputView = (): JSX.Element => {
    return (
      hasChallenges
        ? <p>Dashboard</p>
        : <HomeCallToAction />
    )
  }

  return <OutputView />
}
