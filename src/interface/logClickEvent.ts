interface LogClickEvent extends LogMouseEvent {
    targetId: string;
    lastEvents: LogMouseEvent[];
}