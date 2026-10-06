window.taskData = [
  {
    number: 1,
    name: "Track engagement with analytics around promotions and deals",
    chartLabel: "Promo analytics",
    description:
      "Instrument the promotion surfaces customers see in the app, from viewing an offer to tapping through or continuing an order. Check event names and properties against the agreed definitions, then help turn the resulting funnel into a useful campaign readout.",
    pros: [
      "Shows where customers notice, open, or leave a promotion in the app journey.",
      "A consistent event schema makes campaign comparisons more useful over time.",
      "Combines focused iOS implementation with validation against real app flows.",
    ],
    cons: [
      "Events need careful review so they avoid unnecessary personal or order data.",
      "A tap or view is only a proxy for whether an offer was relevant or successful.",
      "Results depend on shared event definitions and reliable downstream reporting.",
    ],
    interest: 0,
    challenge: 2,
    impact: -2,
    reach: 10,
  },
  {
    number: 2,
    name: "Add custom UI for promotional menu items",
    chartLabel: "Promo UI",
    description:
      "Build a reusable treatment for promotional items in the iOS menu, making the featured product and its offer clear without breaking the normal browse-and-add flow. Account for changing content, small screens, accessibility, and the standard menu states.",
    pros: [
      "Puts the offer where customers are already deciding what to order.",
      "Can exercise both visual polish and reusable menu-component design.",
      "A flexible implementation can support future promotions without one-off screens.",
    ],
    cons: [
      "Extra promotional styling can compete with product information or clutter the menu.",
      "Late changes to offer copy, imagery, or availability can create rework.",
      "The treatment must remain legible and correct across device sizes and menu states.",
    ],
    interest: 3,
    challenge: 3,
    impact: 3,
    reach: 8,
  },
  {
    number: 3,
    name: "Show an upsell pop-up on the add-to-order screen",
    chartLabel: "Upsell pop-up",
    description:
      "Offer a relevant add-on after a customer adds an item, while keeping the choice optional and the path back to ordering obvious. Implement the presentation and dismissal states, and verify that accepting, declining, or reopening the prompt does not corrupt the cart.",
    pros: [
      "Can surface a useful pairing at a moment when the customer is already ordering.",
      "Creates a bounded UI change whose acceptance and dismissal behavior can be measured.",
      "Offers practical work on interruption timing, focus, and accessible controls.",
    ],
    cons: [
      "An unwanted prompt adds friction to a flow where customers may value speed.",
      "Irrelevant or repeated suggestions can reduce trust in the ordering experience.",
      "Cart updates, dismissal, and navigation add cases to an already sensitive flow.",
    ],
    interest: 0,
    challenge: 5,
    impact: -5,
    reach: 10,
  },
  {
    number: 4,
    name: "Display coupons and rewards in checkout",
    chartLabel: "Checkout offers",
    description:
      "Present eligible coupons or rewards during checkout and make their status clear as the order changes. Handle loading, ineligible, expired, and applied states, and keep the displayed total in sync with the authoritative offer and pricing results.",
    pros: [
      "Makes a customer's available savings visible before they place the order.",
      "Clear status and totals can reduce uncertainty about how an offer applies.",
      "Exercises important integration points between checkout UI and offer rules.",
    ],
    cons: [
      "Eligibility rules and exclusions can be difficult to communicate in limited space.",
      "Offer state and price recalculation must stay consistent through cart changes.",
      "The app may depend on service behavior and policy decisions outside the iOS team's control.",
    ],
    interest: 2,
    challenge: 5,
    impact: 5,
    reach: 10,
  },
  {
    number: 5,
    name: "Implement order tracking via an iOS Live Activity",
    chartLabel: "Live Activity",
    description:
      "Use ActivityKit to start and update an order-progress Live Activity, showing only the most useful current status outside the app. Handle the activity lifecycle, stale or missing updates, supported presentation sizes, and a clear end state when tracking is finished.",
    pros: [
      "Lets customers check progress from system surfaces without reopening the app.",
      "Builds experience with ActivityKit, activity lifecycle, and compact system UI.",
      "Connects customer-facing iOS work with the freshness of order status updates.",
    ],
    cons: [
      "Out-of-date status can be more confusing than showing no live update.",
      "Starting, updating, and ending activities introduces lifecycle and recovery cases.",
      "Availability and presentation depend on iOS version, device support, and customer settings.",
    ],
    interest: 8,
    challenge: 10,
    impact: 5,
    reach: 8,
  },
  {
    number: 6,
    name: "Fix duplicate order submission",
    chartLabel: "Duplicate orders",
    description:
      "Trace reports of one intended order being submitted more than once through the app's submit, loading, and retry paths. Coordinate any client safeguards with the service's duplicate-handling behavior, then verify that retries recover safely without blocking a legitimate new order.",
    pros: [
      "Addresses a high-consequence failure in a customer-facing purchase flow.",
      "A reproducible case can lead to a precise regression test and observable fix.",
      "Improving retry behavior can make order submission more dependable under poor connectivity.",
    ],
    cons: [
      "The cause may span client state, network retries, and server-side order creation.",
      "Intermittent timing and connectivity issues can make diagnosis difficult.",
      "A client-only lock can hide the symptom while still allowing duplicate requests at the service.",
    ],
    interest: 0,
    challenge: 2,
    impact: 10,
    reach: 2,
  },
  {
    number: 7,
    name: "Reduce menu load time",
    chartLabel: "Menu speed",
    description:
      "Measure menu startup and browsing on representative devices, then trace time spent fetching, decoding, and rendering menu data or images. Make a targeted change and compare the same user-visible performance measures while checking that menu content stays current.",
    pros: [
      "Shorter waits can make a central browse-and-order journey feel more responsive.",
      "Before-and-after measurements help focus work on the actual bottleneck.",
      "A shared improvement can benefit many menu items and customer sessions.",
    ],
    cons: [
      "Observed delay can vary with network quality, device age, and service response time.",
      "Caching or parallel loading changes can show stale, missing, or out-of-order content.",
      "A local benchmark may not reflect the improvement customers experience in production.",
    ],
    interest: 0,
    challenge: 4,
    impact: 6,
    reach: 10,
  },
  {
    number: 8,
    name: "Keep the app current with iOS and Xcode",
    chartLabel: "Platform upkeep",
    description:
      "Keep the iOS project building with supported Xcode and SDK versions, address deprecated APIs or changed platform behavior, and run critical flows across the supported OS range. Separate required compatibility fixes from optional modernization so upgrades remain reviewable.",
    pros: [
      "Maintains a reliable path to build, test, sign, and ship the app.",
      "Early OS and toolchain checks can expose issues before an upgrade becomes urgent.",
      "A planned update can reduce accumulated reliance on outdated APIs and tooling.",
    ],
    cons: [
      "Much of the benefit is risk avoided rather than a feature customers can see.",
      "SDK and build-tool compatibility can block progress outside the app team's code.",
      "OS behavior changes can expand regression testing across devices and supported versions.",
    ],
    interest: 8,
    challenge: 10,
    impact: 0,
    reach: 10,
  },
  {
    number: 9,
    name: "Validate and support regular app releases",
    chartLabel: "Releases",
    description:
      "Support the release cycle by validating changes on relevant devices, checking high-value ordering and account regressions, and helping diagnose release blockers. After submission or rollout, watch agreed health signals and route any newly observed issues to the right owners.",
    pros: [
      "Connects engineering changes to a dependable customer-facing release.",
      "Repeated checks build familiarity with the app's most failure-sensitive journeys.",
      "Post-release observation can catch regressions that local testing did not reveal.",
    ],
    cons: [
      "The cycle can be repetitive, especially when many changes share one release.",
      "Late fixes and release deadlines can interrupt planned development work.",
      "Review, rollout, or production issues can change timing with little notice.",
    ],
    interest: 5,
    challenge: 3,
    impact: 8,
    reach: 8,
  },
  {
    number: 10,
    name: "Review accessibility and remediate key flows",
    chartLabel: "Accessibility",
    description:
      "Walk key ordering and account flows with VoiceOver and larger text settings, identify barriers in navigation or control meaning, and fix the underlying iOS views. Recheck focus order, announcements, and layout after changes, including custom and dynamic components.",
    pros: [
      "Improves access to essential app tasks for customers using assistive features.",
      "Hands-on VoiceOver testing catches interaction problems static checks may miss.",
      "Clear labels, hierarchy, and scalable layouts often improve general usability too.",
    ],
    cons: [
      "Meaningful validation requires dedicated testing beyond a quick visual review.",
      "Shared components may need broader changes than the first reported screen.",
      "Success is not well represented by aggregate engagement metrics alone.",
    ],
    interest: 2,
    challenge: 0,
    impact: 10,
    reach: 1,
  },
  {
    number: 11,
    name: "Keep privacy, nutrition, and allergen information accurate",
    chartLabel: "Policy content",
    description:
      "When approved privacy, nutrition, or allergen material changes, update the relevant app entry points or presentation and verify that customers can reach the current authoritative information. Keep the implementation aligned with the supplied source rather than inventing or interpreting policy content in the app.",
    pros: [
      "Makes important policy and product information easier to find in the app.",
      "A clear link to current allergen information can help customers make informed choices.",
      "Source-based updates and review steps reduce the risk of stale in-app content.",
    ],
    cons: [
      "The iOS implementation cannot guarantee that upstream content is complete or current.",
      "Small wording or navigation changes can require careful review but little new engineering.",
      "Changes still need verification across entry points, languages, and release timing where applicable.",
    ],
    interest: 0,
    challenge: 0,
    impact: 10,
    reach: 1,
  },
  {
    number: 12,
    name: "Instrument analytics and support product experiments",
    chartLabel: "Analytics",
    description:
      "Implement agreed analytics events or experiment assignments for a specific iOS journey, then verify that exposure and outcome events are emitted at the right time and only once. Check behavior across app relaunches and failure paths, and keep tracking within the approved data and consent rules.",
    pros: [
      "Reliable exposure and outcome events make product questions easier to investigate.",
      "Requires close coordination between iOS, product, and analytics definitions.",
      "A bounded experiment can test an assumption before a wider rollout.",
    ],
    cons: [
      "Variant assignment and event definitions can diverge between client and service.",
      "Experiment states add branches to QA, debugging, and support investigations.",
      "Poorly scoped data collection or overconfident interpretation can mislead decisions.",
    ],
    interest: 0,
    challenge: 0,
    impact: -4,
    reach: 7,
  },
  {
    number: 13,
    name: "Triage customer and restaurant feedback",
    chartLabel: "Feedback fixes",
    description:
      "Turn customer or restaurant reports into actionable iOS work: clarify the affected flow, gather privacy-safe reproduction details, check whether the issue is already known, and either ship a focused fix or route it to the responsible team.",
    pros: [
      "Starts from a concrete problem someone encountered in the app experience.",
      "A narrow fix can remove friction even when it does not affect every customer.",
      "Repeated reports can reveal a broader reliability or usability pattern.",
    ],
    cons: [
      "Reports may lack device, app-version, or sequence details needed to reproduce a bug.",
      "Unplanned triage can fragment time reserved for larger projects.",
      "The app may not own the underlying cause, even when the symptom appears in iOS.",
    ],
    interest: 0,
    challenge: 2,
    impact: 3,
    reach: 1,
  },
  {
    number: 14,
    name: "Retire stale flags and maintain dependencies",
    chartLabel: "Maintenance",
    description:
      "Inventory feature flags and third-party packages, confirm owners and active usage, and remove or upgrade only after checking configuration and call sites. Keep changes small enough to isolate regressions in critical ordering and account flows.",
    pros: [
      "Removing dead branches can make current behavior easier to reason about and test.",
      "A dependency inventory surfaces unmaintained or incompatible packages earlier.",
      "Planned upgrades reduce the chance of a rushed change when support or security needs shift.",
    ],
    cons: [
      "The customer benefit is usually indirect and may be difficult to measure.",
      "A flag that appears unused in code may still be controlled by remote configuration or release practice.",
      "Dependency changes can introduce transitive updates, build issues, or unexpected behavior.",
    ],
    interest: 0,
    challenge: 0,
    impact: 0,
    reach: 0,
  },
];

