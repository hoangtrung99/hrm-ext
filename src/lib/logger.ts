const HRM_LABEL = "[HRM Solashi] : ";

export default function logger(message: string, ...rest: unknown[]) {
  console.log(HRM_LABEL, message, ...rest);
}
