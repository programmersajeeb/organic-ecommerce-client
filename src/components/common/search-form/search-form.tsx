import { Search } from "lucide-react";
import type {
  ComponentType,
  FormHTMLAttributes,
  InputHTMLAttributes,
  SVGProps,
} from "react";

type SearchFormIcon = ComponentType<SVGProps<SVGSVGElement>>;

type SearchFormMethod = "get" | "post";

type SearchFormClassNames = Readonly<{
  root?: string;
  label?: string;
  icon?: string;
  input?: string;
  submit?: string;
  submitIcon?: string;
}>;

type NativeFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "action" | "children" | "className" | "method" | "role"
>;

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "aria-label"
  | "autoCapitalize"
  | "autoComplete"
  | "autoCorrect"
  | "className"
  | "enterKeyHint"
  | "id"
  | "name"
  | "placeholder"
  | "spellCheck"
  | "type"
>;

export type SearchFormProps = Readonly<
  NativeFormProps & {
    id: string;
    label: string;
    action?: string;
    method?: SearchFormMethod;
    name?: string;
    placeholder?: string;
    submitLabel?: string;
    className?: string;
    classNames?: SearchFormClassNames;
    icon?: SearchFormIcon;
    submitIcon?: SearchFormIcon;
    inputProps?: NativeInputProps;
    autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  }
>;

function getClassName(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function SearchForm({
  action = "/",
  autoComplete = "off",
  className,
  classNames,
  icon: Icon = Search,
  id,
  inputProps,
  label,
  method = "get",
  name = "q",
  onSubmit,
  placeholder = "Search...",
  submitIcon: SubmitIcon = Search,
  submitLabel = "Search",
  ...props
}: SearchFormProps) {
  return (
    <form
      {...props}
      action={action}
      method={method}
      role="search"
      className={getClassName(classNames?.root, className)}
      aria-label={props["aria-label"] ?? label}
      onSubmit={onSubmit}
    >
      <label className={getClassName("gb-sr-only", classNames?.label)} htmlFor={id}>
        {label}
      </label>

      <Icon
        aria-hidden="true"
        className={classNames?.icon}
        focusable="false"
      />

      <input
        {...inputProps}
        id={id}
        type="search"
        name={name}
        className={classNames?.input}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCapitalize="none"
        autoCorrect="off"
        enterKeyHint="search"
        spellCheck={false}
      />

      <button
        type="submit"
        className={classNames?.submit}
        aria-label={submitLabel}
      >
        <SubmitIcon
          aria-hidden="true"
          className={classNames?.submitIcon}
          focusable="false"
        />
      </button>
    </form>
  );
}