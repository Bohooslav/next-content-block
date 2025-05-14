import { DropdownMenu } from "radix-ui";

import { Button } from "../ui";

import styles from "./RadixDropdownMenu.module.scss";

function GradientDivider() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-rose-100 h-[2px] w-full" />
  );
}

function GradientIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined 
        text-transparent
        bg-gradient-to-r
        from-indigo-700
        to-indigo-300
        bg-clip-text
        text-[1.5rem]
        ${className}
        `}
    >
      {name}
    </span>
  );
}

type BulletList = {
  text: string;
  items: string[];
};

type ContentBlockProps = {
  header: string;
  summary: string;
  content: (string | BulletList)[];
  isLoading: boolean;
  type?: string;
  actions?: string[];
  regenerate?: () => void;
};

export function ContentBlock({
  header,
  summary,
  content,
  isLoading,
  type = "I'm useless",
  actions,
  regenerate,
}: ContentBlockProps) {
  return (
    <div
      className="
        flex flex-col
        shadow-xl
        max-w-[42rem] w-full mx-auto bg-white rounded-lg border border-stone-200

        border-3
        border-transparent
        rounded-lg

        [background-image:linear-gradient(white,_white),_linear-gradient(to_right,_theme(colors.indigo.50),_theme(colors.rose.100))]
        [background-origin:padding-box,_border-box]
        [background-clip:padding-box,_border-box]
      "
    >
      <section className="p-4">
        <header className="flex gap-1">
          <h2 className="text-stone-900 font-bold text-xl mr-auto">{header}</h2>
          <Button variant="icon">
            <span className="material-symbols-outlined">more_horiz</span>
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="icon">
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={styles.DropdownMenuContent}
                sideOffset={5}
              >
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <GradientIcon name="edit" />
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <GradientIcon name="content_copy" />
                  Duplicate
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <GradientIcon name="delete" />
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </header>
        <p className="text-stone-400 font-medium">{summary}</p>
        <div
          className="
            text-stone-500
            text-base
            font-normal
            mt-2
            flex flex-col gap-2
          "
        >
          {isLoading && (
            <div className="flex items-center justify-center gap-1 p-8 animate-fadeIn">
              <GradientIcon name="hourglass_empty" className="animate-spin" />
              Loading...
            </div>
          )}
          {!isLoading &&
            content.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <p
                    key={index}
                    className="text-stone-500 font-normal mt-2 mb-4 animate-fadeIn"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {item}
                  </p>
                );
              }
              if ("text" in item && "items" in item) {
                return (
                  <div
                    key={index}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="text-xl font-semibold text-black">
                      {item.text}
                    </h3>
                    <ul className="mt-1 mb-3 list-inside">
                      {item.items.map((listItem, listIndex) => (
                        <li
                          key={listIndex}
                          className="
                            flex items-center gap-1
                            my-1
                            before:content-['']
                            before:inline-block
                            before:h-3
                            before:w-3
                            before:bg-black
                            before:rounded-full
                            before:mr-2
                            animate-fadeIn
                          "
                          style={{
                            animationDelay: `${(listIndex + index) * 150}ms`,
                          }}
                        >
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </section>
      <GradientDivider />
      {actions && (
        <>
          <section className="p-4 flex items-center gap-2">
            {actions.map((action, index) => (
              <Button key={index}>
                <GradientIcon name="wand_shine" />
                {action}
              </Button>
            ))}
            <Button variant="icon" className="ml-auto">
              <GradientIcon name="more_horiz" />
            </Button>
          </section>
          <GradientDivider />
        </>
      )}
      <section className="p-4 bg-violet-50 flex items-center gap-3">
        <Button variant="primary" onClick={regenerate}>
          <span className="material-symbols-outlined">wand_stars</span>
          Regenerate
        </Button>
        <button type="button">
          <GradientIcon name="post_add" />
        </button>
        <button type="button">
          <GradientIcon name="content_copy" />
        </button>
        <div className="ml-auto flex items-center gap-1 font-semibold">
          <GradientIcon name="bakery_dining" />
          Ask Maistro
        </div>
      </section>
    </div>
  );
}
