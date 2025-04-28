import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShowAlert } from "./ShowAlert";
import '@testing-library/jest-dom';

describe("ShowAlert Component test", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders correctly", async () => {

    const onCloseMock = vi.fn();

    await act(() => render(<ShowAlert message="Same message" severity="success" onClose={onCloseMock} />));

    const messageElement = screen.getByText("Same message")
    expect(messageElement).toBeInTheDocument();
    expect(onCloseMock).not.toBeCalled();
    act(() => vi.advanceTimersByTime(3000));
    expect(onCloseMock).toBeCalled();
  });
});