export const transitionPopoverAppear = {
  enterActiveClass: "transition ease-out duration-200",
  enterFromClass: "opacity-0 translate-y-1",
  enterToClass: "opacity-100 translate-y-0",
  leaveActiveClass: "transition ease-in duration-150",
  leaveFromClass: "opacity-100 translate-y-0",
  leaveToClass: "opacity-0 translate-y-1",
};

export const transitionOpacity = {
  enterActiveClass: "transition ease-in",
  enterFromClass: "opacity-0",
  enterToClass: "opacity-100",
  leaveActiveClass: "transition ease-in",
  leaveFromClass: "opacity-100",
  leaveToClass: "opacity-0",
};

export const transitionScale = {
  enterActiveClass: "transition ease-in",
  enterFromClass: "scale-0",
  enterToClass: "scale-100",
  leaveActiveClass: "transition ease-in",
  leaveFromClass: "scale-100",
  leaveToClass: "scale-0",
};
