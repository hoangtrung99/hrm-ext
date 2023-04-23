const HRM_LABEL = "[HRM Solashi] : ";

export default function logger(info: unknown, ...rest: unknown[]) {
  console.log(HRM_LABEL, info, ...rest);
}
