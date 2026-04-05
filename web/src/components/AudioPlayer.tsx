import React, { useRef, useState, useCallback, useEffect } from "react";
import { mono } from "../terminal-theme";
import { FiVolume2, FiVolume1, FiVolume, FiVolumeX, FiPlay, FiPause, FiRepeat, FiRotateCcw } from "react-icons/fi";

interface Palette {
  bg: string;
  surface: string;
  border: string;
  green: string;
  cyan: string;
  text: string;
  muted: string;
  dim: string;
  separator: string;
  titleBar: string;
}

interface AudioPlayerProps {
  src: string;
  c: Palette;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, c }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  // Refs so drag/seek callbacks never capture stale values
  const draggingRef = useRef(false);
  const durationRef = useRef(0);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.loop = loop;
  }, [loop]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
  }, [playing]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => { setPlaying(false); setCurrentTime(0); };
    const onTimeUpdate = () => { if (!draggingRef.current) setCurrentTime(el.currentTime); };
    const onLoaded = () => { setDuration(el.duration); durationRef.current = el.duration; };
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("loadedmetadata", onLoaded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []); // no dependency on dragging — we use draggingRef instead

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;
    const dur = durationRef.current;
    if (!dur) return;

    const applySeek = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      el.currentTime = ratio * dur;
      setCurrentTime(ratio * dur);
    };

    applySeek(e.clientX);
    draggingRef.current = true;
    setDragging(true);

    const onMove = (ev: MouseEvent) => applySeek(ev.clientX);
    const onUp = () => {
      draggingRef.current = false;
      setDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []); // refs never go stale — no deps needed

  const seekVolume = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    const bar = volumeRef.current;
    if (!el || !bar) return;

    const applyVolume = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      el.volume = ratio;
      el.muted = false;
      setVolume(ratio);
      setMuted(false);
    };

    applyVolume(e.clientX);

    const onMove = (ev: MouseEvent) => applyVolume(ev.clientX);
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  const rewind10 = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, el.currentTime - 10);
  }, []);

  const skip10 = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.min(el.duration || 0, el.currentTime + 10);
  }, []);

  const replay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play();
  }, []);

  const cycleSpeed = useCallback(() => {
    const el = audioRef.current;
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setSpeed(next);
    if (el) el.playbackRate = next;
  }, [speed]);

  const toggleLoop = useCallback(() => {
    const el = audioRef.current;
    const next = !loop;
    setLoop(next);
    if (el) el.loop = next;
  }, [loop]);

  const effectiveVolume = muted ? 0 : volume;
  const progress = duration ? currentTime / duration : 0;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── shared button style helpers ── */
  const iconBtnStyle = (color: string): React.CSSProperties => ({
    background: "transparent",
    border: "none",
    color,
    cursor: "pointer",
    fontFamily: mono,
    fontSize: "0.78rem",
    padding: "0",
    lineHeight: 1,
    flexShrink: 0,
    transition: "color 0.15s",
  });

  const pillBtnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? c.green : "transparent",
    border: `1px solid ${active ? c.green : c.border}`,
    borderRadius: "2px",
    color: active ? c.bg : c.muted,
    cursor: "pointer",
    fontFamily: mono,
    fontSize: "0.72rem",
    padding: "0.12rem 0.45rem",
    lineHeight: 1,
    flexShrink: 0,
    letterSpacing: "0.02em",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
  });

  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderLeft: `3px solid ${c.green}`,
        borderRadius: "2px",
        background: c.bg,
        padding: "0.75rem 1rem",
        fontFamily: mono,
        fontSize: "0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {/* Label */}
      <div style={{ color: c.dim, fontSize: "0.72rem", letterSpacing: "0.05em" }}>
        <span style={{ color: c.green }}>$</span>{" "}
        <span style={{ color: c.muted }}>play</span>{" "}
        <span style={{ color: c.cyan }}>audio-version.wav</span>
      </div>

      {/* Row 1 — Transport: play | [-10] | progress | [+10] | time */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        {/* Play / Pause */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          style={{
            background: "transparent",
            border: `1px solid ${c.green}`,
            borderRadius: "2px",
            color: c.green,
            cursor: "pointer",
            fontFamily: mono,
            fontSize: "0.8rem",
            padding: "0.2rem 0.55rem",
            lineHeight: 1,
            flexShrink: 0,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = c.green;
            (e.currentTarget as HTMLButtonElement).style.color = c.bg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = c.green;
          }}
        >
          {playing ? <FiPause size={14} /> : <FiPlay size={14} />}
        </button>

        {/* -10s — desktop only */}
        {!isMobile && (
          <button
            onClick={rewind10}
            aria-label="Rewind 10 seconds"
            style={iconBtnStyle(c.muted)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.green; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.muted; }}
          >
            -10s
          </button>
        )}

        {/* Progress bar */}
        <div
          ref={progressRef}
          onMouseDown={seek}
          style={{
            userSelect: "none",
            flex: 1,
            height: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* Track */}
          <div style={{ position: "absolute", left: 0, right: 0, height: "4px", background: c.separator, borderRadius: "2px", pointerEvents: "none" }} />
          {/* Fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              height: "4px",
              width: `${progress * 100}%`,
              background: c.green,
              borderRadius: "2px",
              transition: dragging ? "none" : "width 0.1s linear",
              pointerEvents: "none",
            }}
          />
          {/* Scrubber */}
          <div
            style={{
              position: "absolute",
              left: `${progress * 100}%`,
              transform: "translateX(-50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: c.green,
              border: `2px solid ${c.bg}`,
              boxShadow: `0 0 0 1px ${c.green}`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* +10s — desktop only */}
        {!isMobile && (
          <button
            onClick={skip10}
            aria-label="Skip 10 seconds"
            style={iconBtnStyle(c.muted)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.green; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.muted; }}
          >
            +10s
          </button>
        )}

        {/* Time */}
        <span style={{ color: c.muted, fontSize: "0.72rem", flexShrink: 0, minWidth: "72px", textAlign: "right" }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Row 2 — [mobile: -10s | +10s | 🔊 vol] [desktop: 🔊 vol | spacer | speed/loop/replay] */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        {/* -10s + +10s — mobile only, before volume */}
        {isMobile && (
          <>
            <button
              onClick={rewind10}
              aria-label="Rewind 10 seconds"
              style={iconBtnStyle(c.muted)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.green; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.muted; }}
            >
              -10s
            </button>
            <button
              onClick={skip10}
              aria-label="Skip 10 seconds"
              style={iconBtnStyle(c.muted)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.green; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.muted; }}
            >
              +10s
            </button>
          </>
        )}

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          style={iconBtnStyle(muted ? c.dim : c.muted)}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = c.green; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = muted ? c.dim : c.muted; }}
        >
          {muted || volume === 0 ? <FiVolumeX size={14} /> : volume < 0.4 ? <FiVolume size={14} /> : volume < 0.75 ? <FiVolume1 size={14} /> : <FiVolume2 size={14} />}
        </button>

        {/* Volume bar */}
        <div
          ref={volumeRef}
          onMouseDown={seekVolume}
          aria-label="Volume"
          style={{
            userSelect: "none",
            flex: isMobile ? 1 : undefined,
            width: isMobile ? undefined : "64px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Track */}
          <div style={{ position: "absolute", left: 0, right: 0, height: "4px", background: c.separator, borderRadius: "2px", pointerEvents: "none" }} />
          {/* Fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              height: "4px",
              width: `${effectiveVolume * 100}%`,
              background: c.cyan,
              borderRadius: "2px",
              pointerEvents: "none",
            }}
          />
          {/* Scrubber */}
          <div
            style={{
              position: "absolute",
              left: `${effectiveVolume * 100}%`,
              transform: "translateX(-50%)",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: c.cyan,
              border: `2px solid ${c.bg}`,
              boxShadow: `0 0 0 1px ${c.cyan}`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Desktop-only spacer + speed/loop/replay inline */}
        {!isMobile && (
          <>
            <div style={{ flex: 1 }} />
            {/* Speed */}
            <button
              onClick={cycleSpeed}
              aria-label={`Playback speed: ${speed}x`}
              style={pillBtnStyle(speed !== 1)}
              onMouseEnter={(e) => {
                if (speed === 1) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
                  (e.currentTarget as HTMLButtonElement).style.color = c.text;
                }
              }}
              onMouseLeave={(e) => {
                if (speed === 1) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                  (e.currentTarget as HTMLButtonElement).style.color = c.muted;
                }
              }}
            >
              {speed}x
            </button>
            {/* Loop */}
            <button
              onClick={toggleLoop}
              aria-label={loop ? "Disable loop" : "Enable loop"}
              style={pillBtnStyle(loop)}
              onMouseEnter={(e) => {
                if (!loop) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
                  (e.currentTarget as HTMLButtonElement).style.color = c.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!loop) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                  (e.currentTarget as HTMLButtonElement).style.color = c.muted;
                }
              }}
            >
              <FiRepeat size={13} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />loop
            </button>
            {/* Replay */}
            <button
              onClick={replay}
              aria-label="Replay from start"
              style={pillBtnStyle(false)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
                (e.currentTarget as HTMLButtonElement).style.color = c.text;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                (e.currentTarget as HTMLButtonElement).style.color = c.muted;
              }}
            >
              <FiRotateCcw size={13} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />replay
            </button>
          </>
        )}
      </div>

      {/* Row 3 — mobile only: speed | loop | replay */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "flex-end" }}>
          {/* Speed */}
          <button
            onClick={cycleSpeed}
            aria-label={`Playback speed: ${speed}x`}
            style={pillBtnStyle(speed !== 1)}
            onMouseEnter={(e) => {
              if (speed === 1) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
                (e.currentTarget as HTMLButtonElement).style.color = c.text;
              }
            }}
            onMouseLeave={(e) => {
              if (speed === 1) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                (e.currentTarget as HTMLButtonElement).style.color = c.muted;
              }
            }}
          >
            {speed}x
          </button>
          {/* Loop */}
          <button
            onClick={toggleLoop}
            aria-label={loop ? "Disable loop" : "Enable loop"}
            style={pillBtnStyle(loop)}
            onMouseEnter={(e) => {
              if (!loop) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
                (e.currentTarget as HTMLButtonElement).style.color = c.text;
              }
            }}
            onMouseLeave={(e) => {
              if (!loop) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                (e.currentTarget as HTMLButtonElement).style.color = c.muted;
              }
            }}
          >
            <FiRepeat size={13} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />loop
          </button>
          {/* Replay */}
          <button
            onClick={replay}
            aria-label="Replay from start"
            style={pillBtnStyle(false)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = c.muted;
              (e.currentTarget as HTMLButtonElement).style.color = c.text;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
              (e.currentTarget as HTMLButtonElement).style.color = c.muted;
            }}
          >
            <FiRotateCcw size={13} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />replay
          </button>
        </div>
      )}

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export default AudioPlayer;
