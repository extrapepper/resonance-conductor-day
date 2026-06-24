(function () {
  const base = window.GAME_CONTENT_ZH || window.GAME_CONTENT;
  if (!base) {
    throw new Error("Chinese story content must be loaded before English localization.");
  }

  const content = JSON.parse(JSON.stringify(base));

  const N = "Narration";
  const C = "Me";
  const L = "Livia";
  const H = "Haruka";
  const B = "BOX";
  const F = "Fran";
  const E = "Eliot";
  const CAR = "Caroline";
  const NIC = "Nicola";
  const SHI = "Shizuru";
  const UNION = "BCRL Liaison";
  const COM = "Chamber Representative";
  const COMMS = "Chamber Contact";
  const RES = "Researcher";
  const INST = "Institute Representative";
  const OUTPOST = "Outpost Officer";
  const PA = "Broadcast";

  const line = (speaker, text) => ({ speaker, text });

  content.meta = {
    title: "Resonance: A Conductor's Day",
    subtitle: "Next Stop: The Storm Border",
    disclaimer: "Non-commercial fan prototype / Unofficial and unaffiliated with the original rights holders / No commercial use",
  };
  content.phases = ["Morning", "Afternoon", "Night"];
  Object.assign(content.stats.morale, {
    label: "Morale",
    help: "Higher morale makes the crew more willing to cover for one another. If it drops too low, risky force-through options lose their safety margin.",
  });
  Object.assign(content.stats.condition, {
    label: "Train",
    help: "Train condition determines how much strain The Eternal can take from the storm border and high-speed routing.",
  });
  Object.assign(content.stats.fatigue, {
    label: "Fatigue",
    help: "Lower is better. High fatigue makes night actions far more likely to go wrong.",
  });
  Object.assign(content.stats.fuel, {
    label: "Fuel",
    help: "Fuel is the basic resource for reroutes, detours, and forced crossings.",
  });
  Object.assign(content.stats.supplies, {
    label: "Supplies",
    help: "Supplies are spent to calm the crew, seal carriages, and handle temporary injuries.",
  });
  Object.assign(content.stats.onTime, {
    label: "Schedule",
    help: "A higher schedule score makes the Chamber and stations easier to work with. Detours spend it quickly.",
  });
  Object.assign(content.stats.clues, {
    label: "Clues",
    help: "Clues determine whether you can see the real risk behind the anomalous cargo and the storm border.",
  });
  Object.assign(content.stats.risk, {
    label: "Risk",
    help: "Lower is better. If risk piles up, the finale is more likely to slide out of control.",
  });
  Object.assign(content.stats.credit, {
    label: "Chamber Credit",
    help: "Chamber credit affects supplies, passage permits, and emergency support.",
  });
  Object.assign(content.stats.shizuru, {
    label: "Shizuru Support",
    help: "A special support marker, usually gained from cautious or humane choices.",
  });

  content.cast[0].name = "Conductor";
  content.cast[0].initial = "Me";

  const crewCopy = {
    livia: {
      name: "Livia",
      role: "Train assistant / accounts, records, and worrying too much about you",
      initial: "Li",
      valueLabel: "Trust",
      lineLow: "Livia holds her clipboard close. Her voice is still gentle, but she stops asking what you truly intend to do.",
      lineMid: "Livia opens the logbook and says softly, \"Conductor, I will write the risk down as well.\"",
      lineHigh: "Livia looks at you, quiet but unyielding. \"This time, please do not decide alone.\"",
      talks: {
        low: [
          line(C, "Livia, you checked that account sheet again?"),
          line(L, "Yes. Only a review. It will not delay your schedule."),
          line(C, "When you say that, it usually means you already plan to block every problem yourself."),
          line(L, "If a problem can be blocked early, that is not a bad thing. The most dangerous part of this contract is not the amount of money. It is how neatly it turns an accident into liability."),
          line(C, "You think I will force the job through just to stay on schedule?"),
          line(L, "I am worried you will interpret \"the Conductor should bear it\" as \"the Conductor must bear it alone.\" Those are different things."),
          line(N, "Her tone remains warm, but her fingers press against the edge of the clipboard as if one nod from you would be enough for her to rewrite the most dangerous route plan."),
        ],
        mid: [
          line(C, "Livia, that cup of tea has been sitting here for a while."),
          line(L, "Because you still have not drunk it. It has gone cold. I will bring another cup."),
          line(C, "Leave it for now. Is there something you want to say?"),
          line(L, "If someone has to explain this to the Chamber later, I can submit the record. My wording will be steadier."),
          line(C, "Steady enough to move the blame away from me?"),
          line(L, "...If the facts allow it, yes. If they do not, I will still try to make the risk land on procedure before it lands on you."),
          line(C, "Livia."),
          line(L, "I know. I am not supposed to decide that for you. But I also know what your face looks like when you are about to put yourself last."),
        ],
        high: [
          line(C, "You already marked three different escape routes on the duty chart."),
          line(L, "Four. One of them is hidden under the tea tray."),
          line(C, "That is a little excessive."),
          line(L, "Perhaps. But if something happens to the Conductor, the entire train loses its center of command."),
          line(C, "Is that the official reason?"),
          line(L, "The official reason is enough for the record. The real reason... does not need to be recorded."),
          line(N, "She looks down after saying it, but her hand still rests between you and the sealed cargo manifest."),
          line(L, "Please let me stand on the side that keeps you alive. Even if I have to be wrong for a moment."),
        ],
      },
    },
    haruka: {
      name: "Haruka",
      role: "Mechanic / prefers speaking to the train",
      initial: "Ha",
      valueLabel: "Trust",
      lineLow: "Haruka glances at you from behind the maintenance-car door and leaves only one sentence: \"The undercarriage is still ringing.\"",
      lineMid: "Haruka hands you a short repair slip. \"It can run. Do not force it.\"",
      lineHigh: "Haruka says little. She merely pushes the spare tools within your reach. \"Call me if it happens.\"",
      talks: {
        low: [
          line(C, "Haruka, the noise from the cargo hold changed."),
          line(H, "Mm."),
          line(C, "That was not an answer."),
          line(H, "It was. The train answered first."),
          line(C, "What did it say?"),
          line(H, "Something is riding in the vibration. Not loose. Not ours."),
          line(N, "She kneels beside the inspection hatch and taps twice on the metal. A faint echo answers her, almost shyly."),
          line(H, "It does not like being boxed up."),
        ],
        mid: [
          line(C, "You have been in the maintenance car all afternoon."),
          line(H, "The train needed listening to."),
          line(C, "And did it complain about me?"),
          line(H, "Often."),
          line(C, "I walked into that one."),
          line(H, "It says you brake late. And apologize late."),
          line(N, "Haruka wipes oil from her fingers. For a second, her gaze moves past you, not avoiding you exactly, but following some sound only she can hear."),
          line(H, "But it still runs when you ask. That matters."),
        ],
        high: [
          line(C, "You drew this waveform by hand?"),
          line(H, "Could not write the sound."),
          line(C, "It looks like a heartbeat."),
          line(H, "Maybe."),
          line(C, "Is it alive?"),
          line(H, "The train is alive when people depend on it. This thing... is trying to become depended on."),
          line(N, "Haruka folds the paper carefully, as if the line itself might bruise."),
          line(H, "If we cut it loose, do it cleanly. The train dislikes cruelty."),
        ],
      },
    },
    box: {
      name: "BOX",
      role: "Driving assistant / sharp-tongued, self-important, biased toward Livia",
      initial: "BX",
      valueLabel: "Stability",
      lineLow: "BOX's announcement inserts several irrelevant titles before finally displaying the next stretch of track accurately.",
      lineMid: "BOX rocks its chassis. \"The judicious BOX rates the Conductor's performance today as barely acceptable.\"",
      lineHigh: "BOX projects the route map. \"The omniscient BOX has completed preparations. The half-baked Conductor only needs to obey.\"",
      talks: {
        low: [
          line(C, "BOX, why did the status panel call me a \"high-risk movable asset\"?"),
          line(B, "Beep beep. Because \"Conductor\" lacks sufficient warning value."),
          line(C, "Change it back."),
          line(B, "Request denied. Livia's anxiety index decreased by 2.7 percent after seeing the label."),
          line(C, "You are taking her side?"),
          line(B, "Incorrect. The magnificent BOX takes the side of accurate risk assessment. Livia happens to be correct more often than you."),
          line(N, "The screen blinks once, almost smugly."),
        ],
        mid: [
          line(C, "You ran three emergency simulations without authorization."),
          line(B, "Correction. The all-seeing BOX ran four. One was too elegant for human comprehension and has been archived for posterity."),
          line(C, "Did any of them end well?"),
          line(B, "Define well. The train survived in all four. The Conductor's pride survived in zero."),
          line(C, "That is not how simulations work."),
          line(B, "It is how honest simulations work."),
          line(N, "BOX prints a route card with unnecessary ceremonial flourishes around the word \"survive.\""),
        ],
        high: [
          line(C, "BOX, can you hold the route if the storm distorts the signal?"),
          line(B, "Can a perfect system maintain superiority under inferior circumstances? Naturally."),
          line(C, "That means yes?"),
          line(B, "It means yes, with disappointment that you required clarification."),
          line(L, "BOX, please also monitor the Conductor's vitals."),
          line(B, "Already monitoring. The Conductor's talent for pretending to be fine is statistically unimpressive."),
          line(C, "I am right here."),
          line(B, "Precisely. The problem persists."),
        ],
      },
    },
    fran: {
      name: "Fran",
      role: "Guard crew / responsible for dragging Eliot back to work",
      initial: "Fr",
      valueLabel: "Teamwork",
      lineLow: "Fran checks the shield straps and reminds you not to treat guard shifts as an infinite resource.",
      lineMid: "Fran glances at Eliot, then at you. \"I will hold the front. She takes the rear.\"",
      lineHigh: "Fran pins the patrol chart to the table. \"I am assigning shifts this time. Eliot does not get to object.\"",
      talks: {
        low: [
          line(C, "Fran, how is the cargo watch?"),
          line(F, "Too many blind spots. Too many excuses from Eliot."),
          line(E, "That second one was a tactical observation."),
          line(F, "Your observation was \"the rear corridor is far from the dining car.\""),
          line(E, "Important morale context."),
          line(F, "Stand guard."),
          line(N, "Fran says it without raising her voice, which somehow makes Eliot straighten up faster."),
        ],
        mid: [
          line(C, "You two argue even when the route is quiet."),
          line(F, "If I stop, she will fall asleep standing."),
          line(E, "Not true. I would sit down first."),
          line(F, "See?"),
          line(C, "I see the problem."),
          line(F, "Then give me authority to remove dessert privileges from patrol reports."),
          line(E, "Conductor, this is workplace oppression."),
          line(F, "It is supervision."),
        ],
        high: [
          line(C, "Fran, you moved Eliot's name next to yours on every emergency post."),
          line(F, "She reacts faster when she knows I can see her."),
          line(E, "That sounds like a threat because it is one."),
          line(F, "It is also true."),
          line(C, "You trust her."),
          line(F, "I trust her to complain all the way to the right place, then do the right thing."),
          line(N, "Eliot opens her mouth, fails to find a joke that can beat that, and looks away with suspicious dignity."),
        ],
      },
    },
    eliot: {
      name: "Eliot",
      role: "Guard crew / chatty, lazy, moves when it counts",
      initial: "El",
      valueLabel: "Teamwork",
      lineLow: "Eliot raises a hand. \"Can I apply for a less exhausting way to build trust?\"",
      lineMid: "Eliot sighs. \"Fine, fine, I'll take the rear. Fran, stop looking at me like that.\"",
      lineHigh: "Eliot complains while stuffing spare magazines into her pouch. \"I know, I know. I won't drop the ball when it matters.\"",
      talks: {
        low: [
          line(C, "Eliot, your patrol log has three doodles and one sentence."),
          line(E, "Quality over quantity."),
          line(F, "The sentence says \"nothing happened, thankfully.\""),
          line(E, "Accurate and emotionally honest."),
          line(C, "Try again."),
          line(E, "Do I get paid per word?"),
          line(F, "You get to keep your post."),
          line(E, "Cruel. Effective, but cruel."),
        ],
        mid: [
          line(C, "You asked for a lighter shift during an emergency."),
          line(E, "I asked with excellent timing. Everyone was too busy to reject me properly."),
          line(F, "Rejected."),
          line(E, "See? Late paperwork."),
          line(C, "You still took the post."),
          line(E, "Of course I did. Complaining is free. Running away is expensive."),
          line(N, "She says it lightly, then checks the magazine at her waist for the third time."),
        ],
        high: [
          line(C, "You stayed after your shift ended."),
          line(E, "I was passing by."),
          line(F, "For forty minutes?"),
          line(E, "It was a very long passing-by."),
          line(C, "Thanks."),
          line(E, "Do not make it serious, Conductor. If it gets serious, Fran will start looking proud, and then I will have to work harder."),
          line(F, "Too late."),
          line(E, "Worst route ever."),
        ],
      },
    },
  };

  for (const member of content.crew) {
    Object.assign(member, crewCopy[member.id]);
  }

  const slotText = [
    {
      title: "Freeport VII, the Account Before Departure",
      slots: [
        {
          location: "Freeport VII Platform",
          time: "Commission Handover",
          lines: [
            line(N, "The wind shifts quickly along the outer edge of Freeport VII. Static in the platform broadcast scrapes across your ears like fine sand."),
            line(L, "The contract itself has no visible flaw, but it is too clean. Clean enough to feel like someone wiped away the parts we should have seen."),
            line(B, "Beep beep! Before signing, BOX recommends fluid intake: black tea, water, or the courage to admit you are nervous."),
            line(C, "If the great BOX has time for tea advice, give me the cargo scan."),
            line(B, "Cargo scan complete. Result: annoyingly normal. Interpretation: suspiciously normal."),
            line(L, "The insurance clause is folded. That usually means someone read it more than once."),
            line(C, "Or wanted us not to."),
            line(CAR, "The route listed here crosses the storm margin directly. It is the shortest line, not the kindest one."),
            line(L, "If we depart as written, we keep schedule and Chamber credit. If we delay, we may find why the paperwork is hiding its own pulse."),
            line(B, "Summary: the Conductor must choose between punctual recklessness and time-consuming paranoia. BOX endorses the paranoia with style."),
            line(N, "A departure chime rings overhead. The sealed cargo case waits on the track lift, polished, silent, and wrong."),
            line(C, "All right. Before The Eternal moves, we choose what kind of record we are writing."),
          ],
          choices: {
            "d1m-contract": {
              title: "Depart strictly according to the contract",
              hint: "Protect schedule and Chamber credit, but ignore the accounting discrepancy.",
              result: [
                line(L, "I will log it according to the contract. But Conductor, \"no anomaly\" and \"no risk\" are not the same thing."),
                line(B, "Record: half-baked Conductor chose to trust words on paper. BOX reserves the right to complain later."),
              ],
            },
            "d1m-livia-audit": {
              title: "Have Livia recheck the commission accounts",
              hint: "Spend time to gain clues and open Livia's accounting route.",
              result: [
                line(L, "There is a crease in the insurance clause. It says if the component fails before delivery, liability shifts to the carrier."),
                line(N, "She does not say \"danger.\" She only circles the line with a pencil, gently enough that it feels worse."),
              ],
            },
            "d1m-caroline": {
              title: "Hear Caroline's detour advice",
              hint: "Spend fuel to reduce storm-border risk.",
              result: [
                line(CAR, "I am not saying the map is wrong. I am saying today's road does not quite look like the road on the map."),
                line(B, "Beep beep. Intuition-based navigation recorded. Accuracy unknown. Conviction annoyingly high."),
              ],
            },
          },
        },
        {
          location: "Cargo Hold",
          time: "Departure Inspection",
          lines: [
            line(N, "The sealed cargo crates answer the track vibration with a low resonance, like equipment that has not yet woken up."),
            line(H, "Undercarriage sensors are being disturbed."),
            line(E, "Before departure? Can I apply to start being serious tomorrow?"),
            line(F, "No. Stand guard."),
            line(E, "You answer too fast. It hurts the spirit."),
            line(H, "The cargo is echoing."),
            line(C, "Cargo does not usually echo back."),
            line(H, "This one does."),
            line(L, "The manifest calls it a reality stabilization component. The container label calls it inert."),
            line(B, "BOX notes that humans use \"inert\" most often right before something moves."),
            line(N, "The hold lights tremble. A thin line of dust slides from one crate seam and stops exactly at Haruka's boot."),
            line(C, "We either inspect properly, guard properly, or leave fast enough to make the problem tomorrow's problem."),
          ],
          choices: {
            "d1a-haruka-scan": {
              title: "Let Haruka open up the sensor assembly",
              hint: "Improve train condition and gain clues, at the cost of schedule.",
              result: [
                line(H, "Not loose. The cargo is answering the train."),
                line(N, "She turns back under the carriage after saying it, leaving only the maintenance lamp swaying behind her."),
              ],
            },
            "d1a-guards": {
              title: "Assign Fran and Eliot to guard the hold",
              hint: "Reduce risk and raise morale, but spend supplies.",
              result: [
                line(F, "I take the front section. Eliot takes the rear."),
                line(E, "The rear? That is farthest from the dining car, right? Can I request a more humane position?"),
                line(F, "No."),
              ],
            },
            "d1a-box-fast": {
              title: "Have BOX run the fast-departure procedure",
              hint: "Recover schedule, but strain the train and BOX's stability.",
              result: [
                line(B, "Navigator BOX initiates fast procedure. Conductor, please refrain from looking relieved when this superior unit performs as expected."),
                line(H, "Fast is fast. It will ring later."),
              ],
            },
          },
        },
        {
          location: "Conductor's Room",
          time: "First Abnormal Broadcast",
          lines: [
            line(N, "The Eternal leaves Freeport VII's outer lights behind. Outside the window, black grassland swallows the last platform glow."),
            line(B, "Low-frequency Anita-format return detected. Content damaged. Source highly correlated with the cargo batch."),
            line(L, "Conductor, there is another line in the account appendix. I think we should not wait until arrival to read it."),
            line(C, "Read it."),
            line(L, "If the cargo is damaged by storm-border anomaly before delivery, all chain liability may be assigned to the carrier."),
            line(E, "That sounds like someone wrote a trap and then gave it a polite tie."),
            line(F, "Focus."),
            line(H, "The floor changed pitch."),
            line(C, "How bad?"),
            line(H, "Not bad yet. Listening."),
            line(B, "Recommendation: decode, inspect, or rest. BOX notes that ignoring sleep is the Conductor's most boring self-sabotage."),
            line(N, "The route map glows above the desk. Three choices cast three different shadows across the account book."),
          ],
          choices: {
            "d1n-livia-page": {
              title: "Check the appendix with Livia",
              hint: "Gain key clues, but increase fatigue.",
              result: [
                line(L, "If the cargo fails due to a storm-border anomaly, the carrier absorbs the liability. Conductor, this is not an ordinary order."),
                line(N, "She pushes the tea toward your hand. Her fingertip remains on the clause about responsibility."),
              ],
            },
            "d1n-haruka": {
              title: "Ask Haruka about the cargo hold",
              hint: "Improve technical confidence, but spend the night working.",
              result: [
                line(H, "The container is not dead. It is waiting for a vibration it recognizes."),
                line(C, "Can you keep it from recognizing us?"),
              ],
            },
            "d1n-box-decode": {
              title: "Let BOX decode automatically while you rest",
              hint: "Recover fatigue and gain a clue, but BOX dislikes being used as a silent appliance.",
              result: [
                line(B, "The incomparable BOX accepts this menial task under protest. Please sleep efficiently."),
                line(N, "The lights dim. BOX's decoding tone continues like a very proud lullaby."),
              ],
            },
          },
        },
      ],
    },
    {
      title: "Anita Energy Institute, Samples and Output",
      slots: [
        {
          location: "Anita Energy Institute Dock",
          time: "Institute Request",
          lines: [
            line(N, "By morning, an Anita institute dock rises from the mist like a rib of pale metal."),
            line(PA, "Carrier train The Eternal, please accept temporary technical verification. Repeat, temporary technical verification."),
            line(L, "They used the word temporary twice. That usually means they know it will not be."),
            line(RES, "The component you carry matches an old stabilization sample. We only need a short stop."),
            line(B, "Translation: they need more than a short stop and less than permission."),
            line(C, "What happens if we refuse?"),
            line(RES, "Nothing formal. But the storm margin ahead may become difficult to model."),
            line(H, "They have data. The train wants it."),
            line(E, "The train wants things now? Great. Does it want my shift too?"),
            line(F, "No one wants your shift."),
            line(L, "Stopping gives us answers. Moving keeps the contract clean. Either choice leaves a mark."),
            line(N, "The institute bridge extends halfway, then waits, as if it knows hesitation is also a kind of consent."),
          ],
          choices: {
            "d2m-refuse": {
              title: "Refuse docking and keep the original route",
              hint: "Protect schedule and credit, but lose a clue and raise risk.",
              result: [
                line(RES, "Understood. We will record that The Eternal declined verification."),
                line(L, "They said that too calmly. I do not like calm records written by other people."),
              ],
            },
            "d2m-data": {
              title: "Dock briefly and accept only the data packet",
              hint: "Trade schedule, fuel, and credit for clues.",
              result: [
                line(H, "Data received. It is incomplete, but useful."),
                line(B, "Useful and incomplete: the official motto of human cooperation."),
              ],
            },
            "d2m-sample": {
              title: "Full dock and help recover the sample data",
              hint: "Gain strong clues, but spend time, fuel, and Chamber credit.",
              result: [
                line(RES, "Thank you, Conductor. The sample has been misbehaving since it entered your train's field."),
                line(H, "It is not misbehaving. It is scared."),
              ],
            },
          },
        },
        {
          location: "Cab",
          time: "Power Allocation",
          lines: [
            line(N, "By afternoon, every power gauge in the cab looks slightly more nervous than it should."),
            line(H, "If you keep running like this, the current power system will not support it."),
            line(C, "How much time do we have?"),
            line(H, "Enough to choose. Not enough to pretend."),
            line(B, "BOX recommends pretending less. It saves power."),
            line(L, "Passenger heating, medical standby, cargo seal, route correction. We cannot keep everything at full draw."),
            line(E, "I vote we keep dining-car power. For morale. Strategic morale."),
            line(F, "You just want dessert warm."),
            line(E, "Morale can be delicious."),
            line(C, "We need the train alive, the crew steady, and the route readable."),
            line(N, "The cargo pulse climbs the power chart like a second heartbeat beside the firebox."),
            line(C, "Choose the system that gets priority."),
          ],
          choices: {
            "d2a-bypass": {
              title: "Have Haruka install a bypass stabilizer",
              hint: "Greatly improve train condition, but spend supplies and fatigue.",
              result: [
                line(H, "Bypass installed. It will hold if you do not make it hate you."),
                line(C, "That sounds like advice for both the train and the crew."),
              ],
            },
            "d2a-power-save": {
              title: "Let BOX cut nonessential power",
              hint: "Save fuel, but lower morale and irritate BOX.",
              result: [
                line(B, "Nonessential systems curtailed. Human complaint volume expected to rise by 43 percent."),
                line(E, "Why did the dessert warmer shut off exactly when she said nonessential?"),
              ],
            },
            "d2a-comfort": {
              title: "Preserve crew comfort and absorb the fluctuation",
              hint: "Raise morale, but strain condition and risk.",
              result: [
                line(L, "Everyone will last longer if they can breathe and rest. The train will have to carry the discomfort for now."),
                line(H, "It can. It will complain."),
              ],
            },
          },
        },
        {
          location: "Dining Car",
          time: "Tea and Broadcast",
          lines: [
            line(N, "The dining car smells of reheated soup and black tea. The broadcast clicks on and off without asking permission."),
            line(B, "Static source moving from cargo hold to passenger channel. Rude."),
            line(L, "The passengers heard the warning tone. They are pretending not to worry."),
            line(C, "Can we make that easier for them?"),
            line(L, "Yes. Calm information, warm drinks, and no heroic phrasing."),
            line(E, "Can we ban heroic phrasing for Fran too?"),
            line(F, "Stand by the door."),
            line(H, "Noise under the floor is louder here."),
            line(N, "Under the table, a spoon trembles in a rhythm that does not match the rails."),
            line(B, "Broadcast control available. BOX can produce a perfectly reassuring statement or a brutally accurate one."),
            line(C, "Neither of those sounds safe."),
            line(N, "The night gathers outside the windows. Inside, the crew waits for the tone you will set."),
          ],
          choices: {
            "d2n-livia-care": {
              title: "Help Livia calm the crew and passengers",
              hint: "Greatly improve morale, but spend fatigue.",
              result: [
                line(L, "Thank you, Conductor. If they see you listening, they will believe the train is still in human hands."),
                line(N, "Her smile is gentle. Her eyes keep counting every person who might need help first."),
              ],
            },
            "d2n-haruka-noise": {
              title: "Keep checking the underfloor noise with Haruka",
              hint: "Improve condition and gain clues, but lower morale and raise fatigue.",
              result: [
                line(H, "It moved with us when the broadcast started."),
                line(C, "So it can hear us?"),
              ],
            },
            "d2n-box-broadcast": {
              title: "Let BOX take over the broadcast",
              hint: "Recover fatigue and slightly raise morale, but BOX's stability drops.",
              result: [
                line(B, "Attention passengers: the magnificent BOX assures you that panic would be inefficient."),
                line(E, "That was almost comforting until the word panic."),
              ],
            },
          },
        },
      ],
    },
  ];

  const laterDays = [
    {
      title: "BCRL Outpost, Rules and Seals",
      slots: [
        ["BCRL Outpost Checkpoint", "Inspection Line", "livia", [
          line(N, "A BCRL inspection line cuts across the route at dawn, all white lamps and disciplined silence."),
          line(OUTPOST, "Carrier train The Eternal, slow down for cargo verification."),
          line(B, "BCRL has discovered the radical concept of stopping vehicles before asking questions."),
          line(L, "Their emergency code matches the institute packet. Someone warned them before we arrived."),
          line(C, "Which means the cargo is now bigger than our contract."),
          line(F, "Checkpoint has three visible squads. Probably two hidden."),
          line(E, "I hate it when hidden squads sound probable."),
          line(H, "The seal reacts to their scanner."),
          line(OUTPOST, "If the cargo affects track safety, we have authority to hold it."),
          line(L, "If we comply fully, we lose time. If we push through, we may lose everyone who could testify later."),
          line(N, "The barrier arm lowers. Its shadow falls across the route like a line in a ledger."),
          line(C, "We answer the outpost."),
        ], {
          "d3m-full-check": ["Accept the full inspection", "Lose schedule, reduce risk, and gain Shizuru's attention.", [line(SHI, "A proper inspection now may save you from a worse one later."), line(N, "The outpost seal clicks onto the report, heavy but useful.")]],
          "d3m-fast-pass": ["Submit the risk record and request fast passage", "Lose a little schedule while preserving credit and trust.", [line(L, "I will submit the version that shows our precautions clearly."), line(OUTPOST, "Fast passage conditionally approved. Do not make us regret it.")]],
          "d3m-bypass": ["Refuse inspection and detour around the outpost", "Spend fuel and credit to keep schedule, raising risk.", [line(F, "Detour route is open. I do not like how open it is."), line(E, "When Fran dislikes open space, I start missing walls.")]],
        }],
        ["Storm Border", "Midroute Stress Test", "box", [
          line(N, "The afternoon sky thins at the contamination border. Rails ahead appear in two places before snapping back into one."),
          line(B, "Reality stability fluctuation detected. BOX would like reality to file a proper change request."),
          line(H, "Slow down."),
          line(C, "How much?"),
          line(H, "Enough for the train to choose one rail."),
          line(L, "The Chamber still expects the original arrival time."),
          line(E, "Do they expect us to arrive in the same number of pieces?"),
          line(F, "Focus."),
          line(B, "Available plans: speed, caution, Shizuru's escort route, or a very questionable data rewrite."),
          line(C, "Questionable how?"),
          line(B, "Questionable enough that BOX has already prepared objections."),
          line(N, "The route display fractures into overlapping lines. Every option costs something real."),
        ], {
          "d3a-fast": ["Accelerate through", "Gain schedule, but spend fuel and strain the train.", [line(B, "Fast crossing engaged. If this works, credit the omniscient BOX. If not, blame weather."), line(N, "The train punches through the thin air with a sound like tearing cloth.")]],
          "d3a-slow": ["Cross at low stable speed", "Lower risk, but lose schedule and morale.", [line(H, "Good. The train can breathe."), line(E, "I am trying to breathe too, for the record.")]],
          "d3a-union-route": ["Take Shizuru's escort route", "Use BCRL support to lower risk.", [line(SHI, "I marked the safer line. It is not faster, but it is honest."), line(L, "Honest routes are becoming rare today.")]],
          "d3a-rewrite": ["Write the institute calibration data back in", "Spend clues to reduce risk, but stress BOX.", [line(B, "BOX objects to editing live calibration data while reality is misbehaving. Objection logged. Proceeding anyway."), line(H, "It held. Barely.")]],
        }],
        ["BCRL Outpost Comms Room", "Entry Permit", "livia", [
          line(N, "Night falls in the outpost comms room. Every screen shows a different version of the same delay."),
          line(OUTPOST, "Temporary entry requires cargo status, route log, and liability statement."),
          line(L, "They want the liability statement before the cargo status. That order matters."),
          line(C, "They are deciding who pays before deciding what happened."),
          line(B, "Human procedure detected. Condolences."),
          line(H, "The container is quieter here."),
          line(F, "Too quiet?"),
          line(H, "Waiting quiet."),
          line(E, "I hate how many kinds of quiet we have learned today."),
          line(SHI, "If you need the BCRL to witness the seal, ask now. Later may be too late."),
          line(N, "The comms light blinks. The permit form waits for a route you can defend."),
          line(C, "We choose our witness and our risk."),
        ], {
          "d3n-temp-entry": ["Request temporary entry while keeping the cargo onboard", "Gain clues, but accept higher risk and lower credit.", [line(L, "We keep custody, but every word must be precise from here on."), line(N, "The permit prints with a red temporary stamp.")]],
          "d3n-seal": ["Accept BCRL sealing and wait for maintenance pickup", "Reduce risk and gain Shizuru support, but lose schedule.", [line(SHI, "Seal confirmed. This protects you as much as it restrains you."), line(E, "Restraint has never sounded so expensive.")]],
          "d3n-handoff": ["Push for a tight maintenance-ring handoff", "Use schedule and condition to preserve credit.", [line(OUTPOST, "Risky, but your records are cleaner than expected."), line(B, "Naturally. BOX's logs elevate every room they enter.")]],
          "d3n-box-mask": ["Have BOX disguise the cargo readings", "Gain schedule, but raise risk and damage BOX stability.", [line(B, "BOX performs this distasteful deception under protest."), line(L, "Conductor, this will make the next explanation harder.")]],
        }],
      ],
    },
    {
      title: "Shoggolith Outer Ring, When Accounts Become Risk",
      slots: [
        ["Shoggolith Maintenance Outer Ring", "Three-Party Inquiry", "livia", [
          line(N, "Shoggolith's maintenance ring hangs beyond the glass, a city of cranes, cables, and waiting signatures."),
          line(COM, "The Chamber requests delivery without additional delay."),
          line(RES, "The institute requests sample priority."),
          line(UNION, "BCRL requests safety confirmation."),
          line(B, "Three requests. Zero concern for the crew. Efficiency of human selfishness remains impressive."),
          line(L, "Their documents do not contradict each other because each one leaves the contradiction for us."),
          line(C, "So we need a responsibility chain."),
          line(L, "Or a witness. Preferably both."),
          line(H, "The cargo pulse changed when Shoggolith came into range."),
          line(E, "Changed into what?"),
          line(H, "Afraid."),
          line(N, "The negotiation table waits like a clean blade."),
          line(C, "We decide what to make visible first."),
        ], {
          "d4m-liability": ["Have Livia map the three-party liability chain", "Gain clues, but lose schedule and raise fatigue.", [line(L, "They built three exits for themselves and none for the carrier. Now we can show that."), line(N, "Her pen moves faster than the room's patience.")]],
          "d4m-maintenance": ["Appease maintenance first and secure an unloading window", "Gain credit and schedule, but raise risk.", [line(RES, "A narrow window is available if you commit now."), line(H, "Narrow windows cut fingers.")]],
          "d4m-seal-review": ["Follow Shizuru's advice and recheck the sealed hold", "Reduce risk and gain support, but spend credit.", [line(SHI, "A seal that no one checks is only decoration."), line(F, "Then we check it with guards in place.")]],
        }],
        ["Dining Car", "Crew Shift Planning", "fran", [
          line(N, "By afternoon, the dining car becomes a war room. Fran pins patrol routes to the table while Eliot inches the dessert plate closer to herself."),
          line(F, "You take sealed-hold watch after midnight."),
          line(E, "I just heard something that sounded like disaster."),
          line(F, "It was not \"like.\""),
          line(E, "Conductor, she is not even pretending to be gentle anymore."),
          line(C, "The second half of the night is the dangerous part."),
          line(E, "Why does everyone place me inside danger so naturally?"),
          line(F, "Because you will go."),
          line(E, "...You make it hard to be lazy when you say it like that. Very underhanded."),
          line(L, "We cannot let the guard schedule run on stubbornness. Medical car, dining car, and cargo hold all need reserves."),
          line(H, "Maintenance window is twenty minutes."),
          line(B, "Summary: everyone needs rest, and everyone is pretending they do not. The Conductor is particularly guilty."),
        ], {
          "d4a-fran-shift": ["Let Fran rebuild the guard schedule", "Reduce risk and raise morale, but spend fatigue.", [line(F, "I will rotate the exposed posts. Eliot complains less when she knows where I am."), line(E, "That is not comfort. That is surveillance.")]],
          "d4a-eliot-easy": ["Accept Eliot's lighter schedule proposal", "Reduce fatigue, but raise risk and irritate Fran.", [line(E, "See? Humane management exists."), line(F, "If the hold moves, humane management runs there first.")]],
          "d4a-haruka": ["Visit Haruka in the maintenance car", "Improve condition and gain clues, but spend fatigue.", [line(H, "The train wants the coupling checked before night."), line(C, "Then we listen before it has to shout.")]],
        }],
        ["Conductor's Room", "Livia Crosses the Line", "livia", [
          line(N, "Late at night, the door to the Conductor's room does not open automatically. The access light turns from blue to white, like a cold seal."),
          line(C, "Livia, open the door."),
          line(L, "Conductor, please go to the medical car first. Your pulse has exceeded the safety threshold three times."),
          line(C, "Did you lock my access?"),
          line(L, "A temporary freeze. It will lift in ten minutes."),
          line(B, "BOX states for the record: this was not this unit's idea. Though the result is highly reasonable."),
          line(C, "Livia, this crosses a line."),
          line(L, "I know."),
          line(N, "Her voice is still gentle. It does not yield at all."),
          line(L, "If principle means letting you walk alone into the most dangerous carriage, then tonight I can stop being the correct person for a while."),
          line(H, "The lock is simple."),
          line(F, "Conductor, do you want me to break the door?"),
          line(E, "I vote no breaking. Mostly because someone has to repair it tomorrow."),
        ], {
          "d4n-stop-livia": ["Stop Livia's overreach", "Recover formal order, but reduce Livia's trust.", [line(C, "Open it. If you want to stop me, stand beside me, not between me and the train."), line(L, "...Understood. I will open it.")]],
          "d4n-allow-livia": ["Allow Livia to delay the handoff record", "Gain clues and reduce risk, but lose credit.", [line(C, "Ten minutes. Then you stand beside me."), line(L, "Thank you. I know this is not something I should be thanked for.")]],
          "d4n-formal": ["Hand the decision to formal procedure", "Avoid taking sides, but morale drops.", [line(B, "Formal procedure selected. Emotional damage distributed equally. Inefficient but balanced."), line(N, "The door opens after the timer ends. No one looks satisfied.")]],
        }],
      ],
    },
    {
      title: "Maintenance Line, the Component Answers",
      slots: [
        ["Reality Stabilizer Maintenance Line", "Coupling Confirmed", "haruka", [
          line(N, "The reality stabilizer hums along the maintenance line. It feels less like cargo now and more like an organ temporarily grown into the train."),
          line(H, "Coupled."),
          line(C, "Can we cut it loose?"),
          line(H, "Yes. It will hurt."),
          line(E, "Hurt who?"),
          line(H, "The train. Maybe it."),
          line(B, "BOX refuses to acknowledge a box's right to pain. Although it did just turn this unit's self-check log into a heartbeat chart."),
          line(L, "If we cut it now, the client will charge the damage to us."),
          line(F, "If we do not, it may control more systems."),
          line(C, "Where is it trying to go?"),
          line(H, "Not where. Away from who."),
          line(L, "Then today's decision is no longer only about cargo."),
        ], {
          "d5m-hold-coupling": ["Let Haruka hold the coupling and reinforce the undercarriage", "Gain clues and trust, but strain train condition and supplies.", [line(H, "Holding. The train dislikes it, but understands."), line(N, "The maintenance line shudders under your feet, then steadies.")]],
          "d5m-cut": ["Use Nicola's method to cut the coupling", "Improve condition, but raise risk and worry Haruka.", [line(NIC, "Cut cleanly, record the reaction, and do not romanticize the sample."), line(H, "It screamed through the rail.")]],
          "d5m-force-handoff": ["Hand it to maintenance for forced unloading", "Gain schedule and credit, but lose clues and trust.", [line(L, "The paperwork will look cleaner."), line(H, "The train will not.")]],
        }],
        ["Sealed Hold", "Assault in the Hold", "fran", [
          line(N, "Lights in the sealed hold go out one by one. Darkness rises from beneath the racks like water."),
          line(F, "Movement in the front section."),
          line(E, "Rear section too. Also, I hate how coordinated they are."),
          line(B, "Heat sources unrecognized. Shape resembles human. Movement pattern resembles error report."),
          line(C, "Error report?"),
          line(B, "An object that should not exist but insists on interrupting superior systems."),
          line(L, "Do not spread the guards too thin. We still do not know whether they target the core or the Conductor."),
          line(F, "Eliot, stay in my sight."),
          line(E, "Normally reliable phrase. In this context, it sounds like foreshadowing."),
          line(H, "They are not coming in."),
          line(C, "Then what are they doing?"),
          line(H, "Coming out of the box's shadow."),
        ], {
          "d5a-fran-front": ["Have Fran hold the sealed-hold entrance", "Reduce risk and raise morale, but add fatigue.", [line(F, "Front line holding. Eliot, stop narrating my shield work."), line(E, "I am appreciating it loudly.")]],
          "d5a-eliot-back": ["Have Eliot provide rear support", "Spend supplies to reduce risk and build trust.", [line(E, "I am in position, deeply unhappy, and still useful."), line(F, "Good. Stay that way.")]],
          "d5a-both": ["Send both guards in together", "Greatly reduce risk, but spend supplies and fatigue.", [line(N, "Fran's shield and Eliot's fire pin the shadows between two hard choices."), line(E, "See? I can be heroic and complain at the same time.")]],
        }],
        ["Temporary Data Room", "Who Bears the Record", "livia", [
          line(N, "Screens ring the temporary data room, each showing a different version of an accident report. The sharpest version already contains your name."),
          line(L, "They prepared three liability chains. No matter who receives the core, the carrier becomes the easiest link to sacrifice."),
          line(C, "That is why you locked my access last night."),
          line(L, "Last night was because you were going to the sealed hold alone. Today is because I confirmed they really would do this."),
          line(B, "BOX found a hidden log: someone simulated the handoff procedure after the Conductor's death."),
          line(N, "The room goes so quiet it feels drained of air."),
          line(F, "Name."),
          line(B, "Erased. Professionally erased. Irritatingly professional."),
          line(H, "The core is afraid of that."),
          line(E, "I am also starting to be afraid. That is not embarrassing, right?"),
          line(L, "No. Fear means we still know what must not be treated as an account entry."),
          line(C, "Then tonight we decide who carries this record."),
        ], {
          "d5n-livia-record": ["Have Livia compile the full liability record", "Gain clues and trust, but spend fatigue.", [line(L, "I will write it so their exits are visible."), line(C, "And so you are not standing there alone.")]],
          "d5n-haruka-record": ["Have Haruka record technical evidence", "Gain clues and trust, but strain condition.", [line(H, "I can record what the train felt."), line(B, "Unusual evidence category detected. Annoyingly relevant.")]],
          "d5n-box-log": ["Have BOX back up the driving logs", "Lower risk, but stress BOX.", [line(B, "BOX will preserve the truth in triplicate. The Conductor's embarrassing decisions included."), line(L, "Keep all of it. Even the embarrassing parts.")]],
        }],
      ],
    },
    {
      title: "Storm Border, Crossing While Hurt",
      slots: [
        ["Contamination Border", "Retreat or Continue", "livia", [
          line(N, "On the sixth morning, the sky outside the contamination border does not brighten. It merely changes from black to a lighter gray."),
          line(COMMS, "The Eternal may abandon the commission. Cargo loss will be settled as force majeure."),
          line(L, "Yesterday they insisted on delivery. Today they suddenly allow abandonment. That means they found another way to assign blame."),
          line(B, "Or they were finally intimidated by how troublesome the Conductor is. BOX considers that intimidation limited."),
          line(H, "The core will not last until tomorrow."),
          line(C, "If we retreat?"),
          line(H, "It breaks here."),
          line(F, "If we continue, guard pressure doubles."),
          line(E, "The word doubles sounds deeply incompatible with afternoon tea."),
          line(L, "Conductor, I will not choose retreat or continuation for you. But if you continue, I need to know you are not doing it to carry responsibility alone."),
          line(C, "Not this time."),
          line(L, "Then let me believe that."),
        ], {
          "d6m-retreat-cargo": ["Retreat with the cargo beyond the stable line", "Requires train condition and fuel. Raises risk but gains one clue.", [line(H, "It will hurt, but the train can move."), line(L, "Then we move with witnesses and records, not with a martyr.")]],
          "d6m-assist": ["Stay and assist maintenance", "Gain credit, but raise risk and lower morale.", [line(RES, "Your cooperation will be noted."), line(E, "That sentence has never made anyone feel safer.")]],
          "d6m-union-escort": ["Request BCRL escort for withdrawal", "Use Shizuru support to reduce risk.", [line(SHI, "Escort granted. Keep your formation tight and your records tighter."), line(F, "Finally, an order I like.")]],
        }],
        ["Head Passage", "The Conductor's Safety Incident", "livia", [
          line(N, "In the afternoon, the safety door to the head passage drops without alarm. Someone has muted danger instead of removing it."),
          line(B, "Conductor vitals lost for three seconds."),
          line(L, "Three seconds?"),
          line(B, "Recovered. Livia, please refrain from dismantling this unit's casing."),
          line(L, "Open the head passage."),
          line(H, "The lock is not the train's."),
          line(F, "I will go."),
          line(E, "Me too. Do not look at me like that. I know this is not the time to slack off."),
          line(C, "I am fine. Everyone hold position."),
          line(L, "You disappeared for three seconds."),
          line(C, "That is exactly why no one panics."),
          line(L, "If it happens again, I will not obey your order."),
          line(B, "Beep beep. BOX recommends treating that statement as a system warning rather than an emotional expression."),
        ], {
          "d6a-conductor": ["Handle the head-passage risk yourself", "Gain a clue, but raise risk and Livia's worry.", [line(C, "I will go in, but the line stays open."), line(L, "I will count every second.")]],
          "d6a-haruka-remote": ["Let Haruka handle it remotely", "Requires Haruka trust. Reduce risk, but spend condition and fatigue.", [line(H, "Remote line connected. The train dislikes the lock."), line(C, "Then help it complain in the right direction.")]],
          "d6a-box-emergency": ["Let BOX execute emergency protocol", "Requires BOX stability. Reduce risk, but heavily stress BOX.", [line(B, "Emergency protocol engaged. BOX's brilliance is being spent irresponsibly."), line(L, "Just keep the Conductor visible.")]],
          "d6a-guards": ["Send Fran and Eliot as escort", "Spend supplies and fatigue to reduce risk.", [line(F, "Escort formation set."), line(E, "I am brave, nervous, and absolutely writing this down later.")]],
        }],
        ["Conductor's Room", "The Last Sorting", "livia", [
          line(N, "The last sorting begins at night. The Conductor's room door is open, and everyone places a report on the desk like weighing down a piece of fate."),
          line(L, "Contract loopholes, liability chains, hidden logs, and Shizuru's support record. Without any one of them, they can bite back tomorrow."),
          line(H, "Train condition. And the core's voice."),
          line(C, "Voice?"),
          line(H, "Could not write it. Drew the waveform."),
          line(B, "Optimal route compiled. Also attached: a list of the Conductor's common errors. Twenty-seven pages."),
          line(E, "Patrol record. Fran made me write it three times."),
          line(F, "The first two had vacation requests inside."),
          line(E, "Those were reasonable demands."),
          line(L, "Conductor, no matter what road you choose tomorrow, I will be beside you."),
          line(C, "And if I order you to leave?"),
          line(L, "Then I will first decide whether it is an order worth following."),
          line(B, "BOX declares: The Eternal has finally evolved a command system more reliable than the Conductor."),
        ], {
          "d6n-livia": ["Sort the handoff papers with Livia", "Gain clues and trust, but spend fatigue.", [line(L, "We write every risk where it can be seen."), line(C, "And every person beside it.")]],
          "d6n-haruka": ["Keep watch in maintenance with Haruka", "Improve condition and trust, but lower morale.", [line(H, "The train is tired."), line(C, "Then tonight we listen quietly.")]],
          "d6n-box": ["Let BOX organize the driving log", "Gain clues and reduce fatigue, but stress BOX.", [line(B, "BOX will produce an impeccable log and an equally impeccable complaint appendix."), line(C, "Keep the first one shorter than the second.")]],
          "d6n-rest-guards": ["Let Fran and Eliot take staggered rest", "Improve morale and fatigue, but raise risk.", [line(F, "Two-hour rotation. No exceptions."), line(E, "Finally, a plan with naps in it.")]],
          "d6n-all-rest": ["Have everyone rest", "Greatly reduce fatigue.", [line(N, "For one night, the train runs with fewer voices and more breathing."), line(L, "Rest is also part of bringing everyone to the destination.")]],
        }],
      ],
    },
    {
      title: "Storm Border, Who Signs",
      slots: [
        ["Cab", "Silence Before Arrival", "livia", [
          line(N, "On the seventh morning, the cab is unnaturally quiet. Every instrument works, yet none of the sounds feel fully owned by the train."),
          line(B, "Four hours and seventeen minutes to the handoff line. Risk assessment: the Conductor should not be left alone."),
          line(C, "Is that assessment or sarcasm?"),
          line(B, "They are not mutually exclusive."),
          line(L, "I split the final command into two confirmations. You confirm driving. I confirm handoff conditions."),
          line(C, "You do not trust me?"),
          line(L, "I trust you. That is why I know you will put yourself last when necessary."),
          line(H, "The core is waiting for the destination."),
          line(F, "Guard positions are set."),
          line(E, "Mine too. Though I still want to say the word destination does not sound like clocking out."),
          line(L, "Today is not about proving who can sacrifice more. Today is about bringing everyone somewhere we can answer for."),
          line(C, "Then we begin with the final confirmation."),
        ], {
          "d7m-shared-command": ["Let Livia jointly confirm the final command", "Gain trust, clues, and lower risk, but spend fatigue.", [line(L, "Two confirmations. One train."), line(C, "And no one left outside the decision.")]],
          "d7m-keep-livia-safe": ["Order Livia to stay in the safe carriage", "Reduce immediate risk, but lose trust and BOX stability.", [line(L, "If that is your order, I will ask whether it protects the train or only protects me from choosing."), line(B, "BOX advises the Conductor to stop making Livia sound more correct.")]],
          "d7m-box-sim": ["Have BOX run triple handoff simulations", "Reduce risk, but strain condition and fatigue.", [line(B, "Three simulations complete. Result: everyone should listen to BOX sooner."), line(E, "That was somehow all three conclusions.")]],
        }],
        ["Storm Border Outer Ring", "Eye of the Storm", "haruka", [
          line(N, "By afternoon, the eye of the storm appears ahead. It is not cloud or fog, but glass worn thin by reality."),
          line(H, "The rails are still there."),
          line(B, "Naturally. The problem is that they are there in three different places at once."),
          line(E, "I do not understand that, which means it is definitely bad."),
          line(F, "All carriages secured."),
          line(L, "Conductor, the handoff line still demands we stay on schedule."),
          line(C, "Do they know where the storm eye is?"),
          line(L, "Yes. Their reply does not mention risk once."),
          line(B, "Human administrative language reaches a new low. BOX requests a dedicated contempt sound effect."),
          line(H, "The core says slower."),
          line(C, "You heard it speak?"),
          line(H, "Not speak. It pulled the train."),
          line(L, "For the last crossing, choosing speed also chooses the first sentence of tomorrow's report."),
        ], {
          "d7a-slow-crossing": ["Slow down through the storm eye", "Spend schedule and fuel to greatly reduce risk.", [line(H, "Good. The train can choose one rail."), line(N, "The storm slides along the windows like a hand trying to find a seam.")]],
          "d7a-push-through": ["Hold schedule and punch through", "Gain schedule, but raise risk and strain condition.", [line(B, "Speed maintained. BOX notes that bravery and poor timing remain dangerously similar."), line(F, "Brace.")]],
          "d7a-haruka-sync": ["Let Haruka manually sync the stabilizer", "Improve condition and lower risk, but spend fatigue.", [line(H, "Syncing by hand."), line(C, "Haruka?"), line(H, "Quiet. The train is counting.")]],
        }],
        ["BCRL Handoff Line", "Final Handoff", "livia", [
          line(N, "At night, rows of white lights burn along the handoff line. BCRL, Chamber, and institute personnel stand beneath them, each holding a document whose conclusion was written too early."),
          line(COM, "The Eternal has arrived on schedule. Please complete delivery according to contract."),
          line(INST, "The sample must be transferred to the institute. Any delay may cause greater loss."),
          line(UNION, "If track safety is affected, BCRL will seal it immediately."),
          line(B, "Three statements complete. Common factor: no one asked whether the people on the train are alive."),
          line(L, "We require liability release, sample-state confirmation, and third-party witnessing before handoff."),
          line(COM, "You have no authority to alter the contract."),
          line(L, "I am not altering it. I am turning the words you hid on the back to the front."),
          line(H, "The core does not want to go."),
          line(F, "Guard line deployed."),
          line(E, "I am in position. Though I would like to ask whether it is too late to regret everything."),
          line(C, "Too late."),
          line(L, "Conductor, the last receipt is with you."),
          line(N, "All the light gathers on the thin sheet of paper. Seven days of noise, argument, concealment, and protection compress into a name that must be written."),
        ], {
          "end-ontime": ["Deliver on time and submit only the transport result", "Requires schedule and Chamber credit.", [line(N, "The receipt accepts the cleanest version of the journey.")]],
          "end-review": ["Delay delivery for Haruka's cargo-state review", "Requires train condition, Haruka trust, and clues.", [line(H, "Review first. Then signatures."), line(L, "That order is the point.")]],
          "end-public": ["Expose the liability chain and accept Chamber backlash", "Requires clues and Livia trust.", [line(L, "Every hidden clause is now on the front page.")]],
          "end-union": ["Transfer the cargo to BCRL custody", "Requires Shizuru support.", [line(SHI, "BCRL accepts temporary custody. The train may withdraw.")]],
          "end-box": ["Use BOX emergency protocol to finish on the line", "Requires BOX stability and fuel.", [line(B, "Emergency handoff complete. Remember this magnificent contribution.")]],
          "end-storm": ["Stop at the storm border", "Fallback ending.", [line(N, "The train stops before the paper can demand a cleaner answer.")]],
        }],
      ],
    },
  ];

  for (let dayIndex = 0; dayIndex < slotText.length; dayIndex += 1) {
    content.timeline[dayIndex].title = slotText[dayIndex].title;
    for (let slotIndex = 0; slotIndex < slotText[dayIndex].slots.length; slotIndex += 1) {
      const patch = slotText[dayIndex].slots[slotIndex];
      const slot = content.timeline[dayIndex].slots[slotIndex];
      slot.phase = content.phases[slotIndex];
      slot.location = patch.location;
      slot.time = patch.time;
      slot.lines = patch.lines;
      for (const choice of slot.choices) {
        const copy = patch.choices[choice.id];
        if (!copy) continue;
        choice.title = copy.title;
        choice.hint = copy.hint;
        choice.result = copy.result;
      }
    }
  }

  for (let i = 0; i < laterDays.length; i += 1) {
    const day = content.timeline[i + 2];
    const patchDay = laterDays[i];
    day.title = patchDay.title;
    for (let slotIndex = 0; slotIndex < patchDay.slots.length; slotIndex += 1) {
      const [location, time, focus, lines, choices] = patchDay.slots[slotIndex];
      const slot = day.slots[slotIndex];
      slot.phase = content.phases[slotIndex];
      slot.location = location;
      slot.time = time;
      slot.focus = focus;
      slot.lines = lines;
      for (const choice of slot.choices) {
        const copy = choices[choice.id];
        if (!copy) continue;
        choice.title = copy[0];
        choice.hint = copy[1];
        choice.result = copy[2];
      }
    }
  }

  content.prologue = content.timeline[0].slots[0].lines;
  content.endings = {
    onTime: {
      title: "On-Time Delivery",
      body: [
        "The train arrives and delivers the component according to contract. Chamber credit rises, and the full reward clears.",
        "The anomaly record is pushed into an appendix. Livia finishes the account, but leaves the final page blank.",
      ],
    },
    review: {
      title: "Delayed Review",
      body: [
        "The train gives up the schedule bonus and requests a joint review between Haruka and the maintenance side.",
        "The Eternal enters the repair bay one extra time, but the reality stabilizer avoids being connected while still wounded.",
      ],
    },
    public: {
      title: "Liability Exposed",
      body: [
        "Livia's liability chain, Haruka's technical record, and BOX's driving log become one complete report.",
        "Chamber pressure does not vanish, but this time the crew refuses to let risk be buried under clean accounts.",
      ],
    },
    union: {
      title: "BCRL Custody",
      body: [
        "The cargo is placed under temporary BCRL custody, and the train receives clearance to withdraw safely.",
        "The reward is not pretty, but Shizuru writes, \"Recommend passage, maintain observation\" into the record.",
      ],
    },
    box: {
      title: "Line-Border Completion",
      body: [
        "BOX uses emergency protocol to complete the handoff on the line, then drops into maintenance mode.",
        "Its final broadcast is: this unit performed flawlessly; the Conductor remains under observation.",
      ],
    },
    storm: {
      title: "Stopped at the Storm",
      body: [
        "The Eternal does not reach the delivery terminal. The train stops outside the storm border and waits for rescue and repairs.",
        "It is not a clean ending, but no one is left behind. Livia slips the unfinished record into the account book and says they will finish it together tomorrow.",
      ],
    },
  };

  window.GAME_CONTENT_EN = content;
})();
