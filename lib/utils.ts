export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export const formatINR = (amount: number) => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
