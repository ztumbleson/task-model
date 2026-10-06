const TIME_REFERENCE_HOURS = 8;
const SCORE_EFFORT_SENSITIVITY = 0.5;
const DEADLINE_PRESSURE_FLOOR = 0.25;
const INTRINSIC_SCORE_WEIGHT = 0.55;
const EXTRINSIC_SCORE_WEIGHT = 0.45;

const controls = {
  interest: document.querySelector("#interest"),
  challenge: document.querySelector("#challenge"),
  impact: document.querySelector("#impact"),
  reach: document.querySelector("#reach"),
  effort: document.querySelector("#effort"),
  budget: document.querySelector("#budget"),
};

const resetButton = document.querySelector("#reset-controls");

const outputs = {
  interest: document.querySelector("#interest-value"),
  challenge: document.querySelector("#challenge-value"),
  impact: document.querySelector("#impact-value"),
  reach: document.querySelector("#reach-value"),
  effort: document.querySelector("#effort-value"),
  budget: document.querySelector("#budget-value"),
};

const results = {
  intrinsic: document.querySelector("#intrinsic-score"),
  extrinsic: document.querySelector("#extrinsic-score"),
  overall: document.querySelector("#overall-score"),
  adjustedIntrinsic: document.querySelector("#adjusted-intrinsic"),
  adjustedExtrinsic: document.querySelector("#adjusted-extrinsic"),
  adjustedOverall: document.querySelector("#adjusted-score"),
  deadlineOverall: document.querySelector("#deadline-score"),
  timeFit: document.querySelector("#time-fit"),
};

function formatScore(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}`;
}

function impactColorFor(value) {
  const severity = Math.max(0, Math.min(1, -value / 10));
  const base = [71, 121, 87];
  const negative = [196, 70, 70];
  const channels = base.map((channel, index) =>
    Math.round(channel + (negative[index] - channel) * severity),
  );
  return `rgb(${channels.join(", ")})`;
}

function adjustedScoreFor(score, hours) {
  const effortCost =
    (hours / TIME_REFERENCE_HOURS) *
    (1 - SCORE_EFFORT_SENSITIVITY * (score / 10));
  return score - effortCost;
}

function deadlineMultiplierFor(effort, budget) {
  const timeCoverage = Math.min(budget / effort, 1);
  return DEADLINE_PRESSURE_FLOOR + (1 - DEADLINE_PRESSURE_FLOOR) * timeCoverage;
}

function updateTimeFit(effort, budget) {
  const ratio = budget / effort;
  const multiplier = deadlineMultiplierFor(effort, budget);
  let label;
  let fitClass;

  if (ratio < 1) {
    label = `Tight: ${ratio.toFixed(1)}× the estimated effort`;
    fitClass = "fit-tight";
  } else if (ratio <= 1.5) {
    label = `Balanced buffer: ${ratio.toFixed(1)}× the estimated effort`;
    fitClass = "fit-balanced";
  } else {
    label = `Extra slack: ${ratio.toFixed(1)}× the estimated effort`;
    fitClass = "fit-slack";
  }

  results.timeFit.textContent = `${label} · Deadline factor ${multiplier.toFixed(2)}×`;
  results.timeFit.className = `time-fit ${fitClass}`;
}

function updateScores() {
  const values = Object.fromEntries(
    Object.entries(controls).map(([name, control]) => [name, Number(control.value)]),
  );

  for (const name of ["interest", "challenge", "impact", "reach"]) {
    const value = values[name];
    outputs[name].textContent =
      name === "interest" || name === "challenge" || name === "reach"
        ? String(value)
        : `${value > 0 ? "+" : ""}${value}`;
  }
  outputs.effort.textContent = `${values.effort} ${values.effort === 1 ? "hour" : "hours"}`;
  outputs.budget.textContent = `${values.budget} ${values.budget === 1 ? "hour" : "hours"}`;

  for (const control of Object.values(controls)) {
    const range = Number(control.max) - Number(control.min);
    const progress = ((Number(control.value) - Number(control.min)) / range) * 100;
    control.style.setProperty("--range-progress", `${progress}%`);
  }
  controls.impact.style.setProperty("--impact-color", impactColorFor(values.impact));
  controls.impact.style.setProperty(
    "--impact-negative-progress",
    `${(Math.max(0, -values.impact) / 10) * 50}%`,
  );
  controls.impact.style.setProperty(
    "--impact-positive-progress",
    `${(Math.max(0, values.impact) / 10) * 50}%`,
  );

  const intrinsic = (values.interest + values.challenge) / 2;
  const extrinsic = (values.impact * values.reach) / 10;
  const overall =
    INTRINSIC_SCORE_WEIGHT * intrinsic + EXTRINSIC_SCORE_WEIGHT * extrinsic;
  const adjustedIntrinsic = adjustedScoreFor(intrinsic, values.effort);
  const adjustedExtrinsic = adjustedScoreFor(extrinsic, values.effort);
  const adjustedOverall =
    INTRINSIC_SCORE_WEIGHT * adjustedIntrinsic +
    EXTRINSIC_SCORE_WEIGHT * adjustedExtrinsic;
  const deadlineMultiplier = deadlineMultiplierFor(values.effort, values.budget);
  const deadlineAdjustedOverall =
    adjustedOverall > 0 ? adjustedOverall * deadlineMultiplier : adjustedOverall;

  results.intrinsic.textContent = formatScore(intrinsic);
  results.extrinsic.textContent = formatScore(extrinsic);
  results.overall.textContent = formatScore(overall);
  results.adjustedIntrinsic.textContent = formatScore(adjustedIntrinsic);
  results.adjustedExtrinsic.textContent = formatScore(adjustedExtrinsic);
  results.adjustedOverall.textContent = formatScore(adjustedOverall);
  results.deadlineOverall.textContent = formatScore(deadlineAdjustedOverall);
  updateTimeFit(values.effort, values.budget);
}

for (const control of Object.values(controls)) {
  control.addEventListener("input", updateScores);
}

resetButton.addEventListener("click", () => {
  for (const control of Object.values(controls)) {
    control.value = control.defaultValue;
  }
  updateScores();
});

updateScores();
