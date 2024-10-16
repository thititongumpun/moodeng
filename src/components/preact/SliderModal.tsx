import { h } from "preact";
import { useState } from "preact/hooks";
import { AnimatePresence, motion } from "framer-motion";
import type { Meme } from "@/types/Meme";

type SliderModal = { item: Meme; uniqueId: string; itemArr: Meme[] };

export default function SliderModal({ item, uniqueId, itemArr }: SliderModal) {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState<Meme | null>(item);

  return (
    <>
      <motion.div
        onClick={() => {
          setIsOpen(true);
          setNewItem(item);
        }}
        layoutId={uniqueId}
        className="mb-3 overflow-hidden"
      >
        <img
          width={400}
          height={400}
          src={item?.url}
          className="w-full cursor-zoom-in rounded-md bg-white text-black"
          alt="img"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-20 flex h-screen w-full cursor-zoom-out flex-col items-center justify-center bg-white/80 backdrop-blur-lg dark:bg-black/80"
            onClick={() => {
              setNewItem(null);
              setIsOpen(false);
            }}
          >
            <motion.div
              layoutId={uniqueId}
              className="mx-auto flex h-[80%] w-fit cursor-auto items-center gap-2 rounded-md"
              onClick={(e: h.JSX.TargetedMouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              {newItem && (
                <AnimatePresence>
                  {itemArr.map((tab: Meme, index: number) => (
                    <AnimatePresence mode="popLayout" key={tab.name || index}>
                      {tab.name === newItem.name && (
                        <motion.figure
                          key={tab?.name || `tab-${index}`}
                          className="rounded-md border bg-gray-100/40 p-4 dark:bg-gray-900/40"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                          >
                            <img
                              src={newItem.url}
                              width={1000}
                              height={1000}
                              alt="preview_img"
                              className="mx-auto h-[70vh] rounded-md object-contain"
                            />
                          </motion.div>
                        </motion.figure>
                      )}
                    </AnimatePresence>
                  ))}
                </AnimatePresence>
              )}

              <div className="mt-2 flex flex-col justify-center rounded-md border bg-gray-100/40 dark:bg-gray-900/40">
                {itemArr?.map((itemData, index) => (
                  <motion.div
                    key={itemData.name || `item-${index}`}
                    className={`relative p-2`}
                    onClick={() => setNewItem(itemData)}
                  >
                    <img
                      src={itemData?.url}
                      width={400}
                      height={400}
                      alt="img"
                      className="relative z-[2] h-16 w-28 cursor-pointer rounded-md object-cover"
                    />
                    {itemData?.name === newItem?.name && (
                      <motion.div
                        layoutId="slider"
                        transition={{
                          layout: {
                            duration: 0.2,
                            ease: "easeOut",
                          },
                        }}
                        className="absolute left-0 top-0 h-full w-full rounded-md bg-gray-800 dark:bg-gray-100"
                      ></motion.div>
                    )}
                    {itemData?.name === newItem?.name && (
                      <motion.div
                        layoutId="slider2"
                        transition={{
                          layout: {
                            duration: 0.4,
                            ease: "easeInOut",
                            delay: 0.1,
                          },
                        }}
                        className="absolute left-0 top-0 h-full w-full rounded-md bg-gray-800 dark:bg-gray-100"
                      ></motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
