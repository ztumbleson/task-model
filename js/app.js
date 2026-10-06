const tasks = window.taskData;
const INTRINSIC_SCORE_WEIGHT = 0.55;
const EXTRINSIC_SCORE_WEIGHT = 0.45;
const SCORE_COLOR_MIN = -5;
const SCORE_COLOR_MAX = 9;

const intrinsicPlot = document.querySelector("#intrinsic-plot");
const extrinsicPlot = document.querySelector("#extrinsic-plot");
const combinedPlot = document.querySelector("#combined-plot");
const overallBars = document.querySelector("#overall-bars");
const overallTaskLabels = document.querySelector("#overall-task-labels");
const taskList = document.querySelector("#task-list");
const taskTooltip = document.querySelector("#task-tooltip");
const taskModal = document.querySelector("#task-modal");
const taskModalTitle = document.querySelector("#task-modal-title");
const taskModalContent = document.querySelector("#task-modal-content");
const taskModalClose = document.querySelector("#task-modal-close");

function scoresFor(task) {
  const intrinsic = (task.interest + task.challenge) / 2;
  const extrinsic = (task.impact * task.reach) / 10;
  return {
    intrinsic,
    extrinsic,
    overall:
      INTRINSIC_SCORE_WEIGHT * intrinsic + EXTRINSIC_SCORE_WEIGHT * extrinsic,
  };
}

function positionTaskTooltip(event) {
  const gap = 12;
  const margin = 8;
  const bounds = taskTooltip.getBoundingClientRect();
  const left =
    event.clientX + gap + bounds.width <= window.innerWidth - margin
      ? event.clientX + gap
      : event.clientX - bounds.width - gap;
  const top =
    event.clientY + gap + bounds.height <= window.innerHeight - margin
      ? event.clientY + gap
      : event.clientY - bounds.height - gap;

  taskTooltip.style.left = `${Math.max(margin, Math.min(left, window.innerWidth - bounds.width - margin))}px`;
  taskTooltip.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - bounds.height - margin))}px`;
}

function showTaskTooltip(event) {
  taskTooltip.textContent = event.currentTarget.getAttribute("data-tooltip");
  taskTooltip.classList.add("is-visible");
  taskTooltip.setAttribute("aria-hidden", "false");
  positionTaskTooltip(event);
}

function hideTaskTooltip() {
  taskTooltip.classList.remove("is-visible");
  taskTooltip.setAttribute("aria-hidden", "true");
}

function attachTooltip(element, text) {
  element.setAttribute("data-tooltip", text);
  element.addEventListener("pointerenter", showTaskTooltip);
  element.addEventListener("pointermove", positionTaskTooltip);
  element.addEventListener("pointerleave", hideTaskTooltip);
}

function appendModalScore(container, label, value, isOverall = false) {
  const score = document.createElement("div");
  score.className = isOverall ? "task-modal-score task-modal-overall-score" : "task-modal-score";

  const name = document.createElement("span");
  name.textContent = label;
  const number = document.createElement("strong");
  number.textContent = scoreCellText(value);
  if (value < 0) number.className = "negative-score";
  if (value === 0) number.className = "neutral-score";
  score.append(name, number);
  container.append(score);
}

function appendReasonColumn(container, heading, reasons, className) {
  const column = document.createElement("section");
  column.className = `task-modal-reasons ${className}`;

  const title = document.createElement("h4");
  title.textContent = heading;
  const list = document.createElement("ul");
  for (const reason of reasons) {
    const item = document.createElement("li");
    item.textContent = reason;
    list.append(item);
  }
  column.append(title, list);
  container.append(column);
}

function createTaskDetails(task, showTitle) {
  const details = document.createElement("article");
  details.className = "task-modal-detail";

  if (showTitle) {
    const title = document.createElement("h3");
    title.textContent = `${String(task.number).padStart(2, "0")}. ${task.name}`;
    details.append(title);
  }

  const scores = scoresFor(task);
  const scoreGrid = document.createElement("div");
  scoreGrid.className = "task-modal-score-grid";
  appendModalScore(scoreGrid, "Intrinsic", scores.intrinsic);
  appendModalScore(scoreGrid, "Extrinsic", scores.extrinsic);
  appendModalScore(scoreGrid, "Overall", scores.overall, true);

  const description = document.createElement("p");
  description.className = "task-modal-description";
  description.textContent = task.description;

  const reasons = document.createElement("div");
  reasons.className = "task-modal-reason-grid";
  appendReasonColumn(reasons, "Pros (+)", task.pros, "task-modal-pros");
  appendReasonColumn(reasons, "Cons (−)", task.cons, "task-modal-cons");

  details.append(scoreGrid, description, reasons);
  return details;
}

function openTaskModal(relatedTasks) {
  hideTaskTooltip();
  taskModalTitle.textContent =
    relatedTasks.length === 1 ? relatedTasks[0].name : "Tasks at this point";
  taskModalContent.replaceChildren(
    ...relatedTasks.map((task) => createTaskDetails(task, relatedTasks.length > 1)),
  );
  taskModal.showModal();
}

function attachTaskModal(element, relatedTasks, isNativeButton = false) {
  const taskNames = relatedTasks
    .map((task) => `${String(task.number).padStart(2, "0")}. ${task.name}`)
    .join("; ");
  element.setAttribute("aria-label", `View task details: ${taskNames}`);
  element.addEventListener("click", () => openTaskModal(relatedTasks));

  if (!isNativeButton) {
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTaskModal(relatedTasks);
      }
    });
  }
}

function scoreColor(score) {
  const position = Math.max(
    0,
    Math.min(1, (score - SCORE_COLOR_MIN) / (SCORE_COLOR_MAX - SCORE_COLOR_MIN)),
  );
  const hue = 4 + (139 - 4) * position;
  const saturation = 78 + (68 - 78) * position;
  const lightness = 47 + (40 - 47) * position;
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function createMarker(
  task,
  xValue,
  yValue,
  score,
  xRange = [-10, 10],
  yRange = [-10, 10],
  offsetX = 0,
) {
  const marker = document.createElement("span");
  marker.className = "task-marker";
  marker.style.left = `calc(${
    9 + ((xValue - xRange[0]) / (xRange[1] - xRange[0])) * 82
  }% + ${offsetX}px)`;
  marker.style.top = `${91 - ((yValue - yRange[0]) / (yRange[1] - yRange[0])) * 82}%`;
  marker.style.setProperty("--marker-color", scoreColor(score));
  attachTooltip(marker, `${String(task.number).padStart(2, "0")}. ${task.name}`);
  attachTaskModal(marker, [task]);
  return marker;
}

function offsetCoincidentPoints(points) {
  const groups = new Map();
  for (const point of points) {
    const key = `${point.x},${point.y}`;
    const group = groups.get(key) ?? [];
    group.push(point);
    groups.set(key, group);
  }
  return points.map((point) => {
    const group = groups.get(`${point.x},${point.y}`);
    return {
      ...point,
      offsetX: (group.indexOf(point) - (group.length - 1) / 2) * 22,
    };
  });
}

function renderTasks() {
  for (const task of tasks) {
    const row = document.createElement("li");
    const rowButton = document.createElement("button");
    rowButton.className = "task-row";
    rowButton.type = "button";
    attachTaskModal(rowButton, [task], true);

    const title = document.createElement("span");
    title.className = "task-row-title";

    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent = String(task.number).padStart(2, "0");

    const name = document.createElement("span");
    name.className = "task-row-name";
    name.textContent = task.name;
    title.append(number, name);

    rowButton.append(title);
    row.append(rowButton);
    taskList.append(row);
  }
}

function renderPlot(
  plot,
  coordinatesFor,
  scoreFor,
  xRange = [-10, 10],
  yRange = [-10, 10],
) {
  const points = offsetCoincidentPoints(tasks.map((task) => {
    const { x, y } = coordinatesFor(task);
    return { task, x, y, score: scoreFor(task) };
  }));

  for (const { task, x, y, score, offsetX } of points) {
    plot.append(
      createMarker(
        task,
        x,
        y,
        score,
        xRange,
        yRange,
        offsetX,
      ),
    );
  }
}

function renderPlots() {
  renderPlot(
    intrinsicPlot,
    (task) => ({ x: task.interest, y: task.challenge }),
    (task) => scoresFor(task).intrinsic,
    [0, 10],
    [0, 10],
  );
  renderPlot(
    extrinsicPlot,
    (task) => ({ x: task.impact, y: task.reach }),
    (task) => scoresFor(task).extrinsic,
    [-10, 10],
    [0, 10],
  );
  renderPlot(
    combinedPlot,
    (task) => {
      const scores = scoresFor(task);
      return { x: scores.intrinsic, y: scores.extrinsic };
    },
    (task) => scoresFor(task).overall,
    [0, 10],
  );
}

function renderOverallBars() {
  const columnTemplate = `repeat(${tasks.length}, minmax(0, 1fr))`;
  overallBars.style.gridTemplateColumns = columnTemplate;
  overallTaskLabels.style.gridTemplateColumns = columnTemplate;

  const sortedTasks = [...tasks].sort(
    (first, second) => scoresFor(first).overall - scoresFor(second).overall,
  );

  for (const task of sortedTasks) {
    const score = scoresFor(task).overall;
    const column = document.createElement("span");
    column.className = "overall-bar-column";
    attachTooltip(
      column,
      `${String(task.number).padStart(2, "0")}. ${task.name}\nOverall score: ${scoreCellText(score)}`,
    );
    attachTaskModal(column, [task]);

    const bar = document.createElement("span");
    bar.className = score < 0 ? "overall-bar overall-bar-negative" : "overall-bar";
    bar.style.height = `${Math.abs(score) * 5}%`;
    column.append(bar);
    overallBars.append(column);

    const label = document.createElement("span");
    label.className = "overall-task-label";
    const labelText = document.createElement("span");
    labelText.textContent = `${String(task.number).padStart(2, "0")} ${task.chartLabel}`;
    label.append(labelText);
    overallTaskLabels.append(label);
  }
}

function scoreCellText(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}`;
}

taskModalClose.addEventListener("click", () => taskModal.close());
taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) taskModal.close();
});

renderPlots();
renderOverallBars();
renderTasks();
