"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var useActiveYouTubeVideo_1 = require("../hooks/useActiveYouTubeVideo");
var api_1 = require("../lib/api");
var storage_1 = require("../lib/storage");
function renderInlineMarkdown(text) {
    var tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
    return tokens.map(function (token, index) {
        if (token.startsWith("**") && token.endsWith("**"))
            return React.createElement("strong", { key: index }, token.slice(2, -2));
        if (token.startsWith("`") && token.endsWith("`"))
            return React.createElement("code", { key: index, className: "rounded bg-black/30 px-1 py-0.5 text-[0.92em]" }, token.slice(1, -1));
        if (token.startsWith("*") && token.endsWith("*"))
            return React.createElement("em", { key: index }, token.slice(1, -1));
        return token;
    });
}
function MarkdownAnswer(_a) {
    var content = _a.content;
    var blocks = content.split(/```/g);
    return React.createElement("div", { className: "space-y-2 break-words text-xs leading-5" }, blocks.map(function (block, blockIndex) {
        if (blockIndex % 2 === 1) {
            var lines = block.split("\n");
            var hasLanguageLabel = lines.length > 1 && /^[a-zA-Z0-9_+-]+$/.test(lines[0].trim());
            var code = hasLanguageLabel ? lines.slice(1).join("\n") : block;
            return React.createElement("pre", { key: blockIndex, className: "overflow-x-auto rounded-lg bg-black/40 p-3 text-[11px] leading-5" },
                React.createElement("code", null, code.trim()));
        }
        return block.split(/\n{2,}/).map(function (paragraph, paragraphIndex) {
            var lines = paragraph.split("\n");
            var heading = lines.length === 1 ? /^(#{1,3})\s+(.+)$/.exec(lines[0]) : null;
            if (heading)
                return React.createElement("p", { key: blockIndex + "-" + paragraphIndex, className: "font-semibold text-white" }, renderInlineMarkdown(heading[2]));
            var listLines = lines.filter(function (line) { return /^\s*(?:[-*] |\d+\. )/.test(line); });
            if (listLines.length === lines.length && listLines.length > 0) {
                return React.createElement("ul", { key: blockIndex + "-" + paragraphIndex, className: "list-disc space-y-1 pl-4" }, listLines.map(function (line, index) { return React.createElement("li", { key: index }, renderInlineMarkdown(line.replace(/^\s*(?:[-*] |\d+\. )/, ""))); }));
            }
            return React.createElement("p", { key: blockIndex + "-" + paragraphIndex, className: "whitespace-pre-wrap" }, lines.map(function (line, index) { return React.createElement("span", { key: index },
                index > 0 ? "\n" : "",
                renderInlineMarkdown(line)); }));
        });
    }));
}
var SUGGESTED_QUESTIONS = [
    "Summarize this video",
    "What are the key takeaways?",
    "Explain the main concepts",
    "What examples does the speaker give?",
];
function formatTimestamp(seconds) {
    var value = Math.max(0, Math.floor(seconds));
    var hours = Math.floor(value / 3600);
    var minutes = Math.floor((value % 3600) / 60);
    var remainingSeconds = value % 60;
    return [hours, minutes, remainingSeconds].map(function (part) { return String(part).padStart(2, "0"); }).join(":");
}
function createSession(video) {
    var now = Date.now();
    return {
        id: crypto.randomUUID(),
        videoId: video.videoId,
        videoTitle: video.title,
        thumbnailUrl: video.thumbnailUrl,
        title: "New chat",
        createdAt: now,
        updatedAt: now,
        messages: []
    };
}
function VideoDetection() {
    var _this = this;
    var _a, _b, _c, _d;
    var _e = useActiveYouTubeVideo_1.useActiveYouTubeVideo(), video = _e.video, status = _e.status, error = _e.error, refresh = _e.refresh;
    var _f = react_1.useState([]), sessions = _f[0], setSessions = _f[1];
    var _g = react_1.useState({}), selectedByVideo = _g[0], setSelectedByVideo = _g[1];
    var _h = react_1.useState(false), sessionReady = _h[0], setSessionReady = _h[1];
    var _j = react_1.useState([]), indexedVideos = _j[0], setIndexedVideos = _j[1];
    var _k = react_1.useState(false), indexing = _k[0], setIndexing = _k[1];
    var _l = react_1.useState(null), indexError = _l[0], setIndexError = _l[1];
    var _m = react_1.useState(null), indexedChunks = _m[0], setIndexedChunks = _m[1];
    var _o = react_1.useState(""), question = _o[0], setQuestion = _o[1];
    var _p = react_1.useState(false), asking = _p[0], setAsking = _p[1];
    var _q = react_1.useState(null), streamingMessageId = _q[0], setStreamingMessageId = _q[1];
    var _r = react_1.useState(null), chatError = _r[0], setChatError = _r[1];
    var _s = react_1.useState(null), failedQuestion = _s[0], setFailedQuestion = _s[1];
    var _t = react_1.useState(null), copiedMessageId = _t[0], setCopiedMessageId = _t[1];
    var abortControllerRef = react_1.useRef(null);
    var _u = react_1.useState(false), renaming = _u[0], setRenaming = _u[1];
    var _v = react_1.useState(""), renameValue = _v[0], setRenameValue = _v[1];
    var scrollRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var cancelled = false;
        Promise.all([storage_1.getSessions(), storage_1.getSelectedSessions(), storage_1.getIndexedVideos()]).then(function (_a) {
            var storedSessions = _a[0], selected = _a[1], indexed = _a[2];
            if (cancelled)
                return;
            setSessions(storedSessions);
            setSelectedByVideo(selected);
            setIndexedVideos(indexed);
            setSessionReady(true);
        })["catch"](function (err) {
            if (!cancelled) {
                setChatError(err instanceof Error ? err.message : "Could not restore saved chats.");
                setSessionReady(true);
            }
        });
        return function () { cancelled = true; };
    }, []);
    var videoSessions = react_1.useMemo(function () { return sessions.filter(function (session) { return session.videoId === (video === null || video === void 0 ? void 0 : video.videoId); }).sort(function (a, b) { return b.updatedAt - a.updatedAt; }); }, [sessions, video === null || video === void 0 ? void 0 : video.videoId]);
    var activeSession = (_b = (_a = videoSessions.find(function (session) { var _a; return session.id === selectedByVideo[(_a = video === null || video === void 0 ? void 0 : video.videoId) !== null && _a !== void 0 ? _a : ""]; })) !== null && _a !== void 0 ? _a : videoSessions[0]) !== null && _b !== void 0 ? _b : null;
    var messages = (_c = activeSession === null || activeSession === void 0 ? void 0 : activeSession.messages) !== null && _c !== void 0 ? _c : [];
    var isIndexed = Boolean(video && indexedVideos.includes(video.videoId));
    react_1.useEffect(function () {
        if (!sessionReady || !video)
            return;
        var cancelled = false;
        var ensureSession = function () { return __awaiter(_this, void 0, void 0, function () {
            var existing, preferredId, preferred, fresh;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        existing = sessions.filter(function (session) { return session.videoId === video.videoId; });
                        preferredId = selectedByVideo[video.videoId];
                        preferred = (_a = existing.find(function (session) { return session.id === preferredId; })) !== null && _a !== void 0 ? _a : existing.sort(function (a, b) { return b.updatedAt - a.updatedAt; })[0];
                        if (!preferred) return [3 /*break*/, 3];
                        if (!(preferred.id !== preferredId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, storage_1.setSelectedSession(video.videoId, preferred.id)];
                    case 1:
                        _b.sent();
                        if (!cancelled)
                            setSelectedByVideo(function (current) {
                                var _a;
                                return (__assign(__assign({}, current), (_a = {}, _a[video.videoId] = preferred.id, _a)));
                            });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                    case 3:
                        fresh = createSession(video);
                        return [4 /*yield*/, storage_1.saveSession(fresh)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, storage_1.setSelectedSession(video.videoId, fresh.id)];
                    case 5:
                        _b.sent();
                        if (!cancelled) {
                            setSessions(function (current) { return __spreadArrays(current, [fresh]); });
                            setSelectedByVideo(function (current) {
                                var _a;
                                return (__assign(__assign({}, current), (_a = {}, _a[video.videoId] = fresh.id, _a)));
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        void ensureSession();
        return function () { cancelled = true; };
    }, [sessionReady, video === null || video === void 0 ? void 0 : video.videoId]); // Session selection is reconciled when active video changes.
    react_1.useEffect(function () {
        if (!sessionReady || !activeSession)
            return;
        var timer = window.setTimeout(function () {
            void storage_1.saveSession(__assign(__assign({}, activeSession), { updatedAt: Date.now() }));
        }, 250);
        return function () { return window.clearTimeout(timer); };
    }, [sessionReady, activeSession === null || activeSession === void 0 ? void 0 : activeSession.id, activeSession === null || activeSession === void 0 ? void 0 : activeSession.messages]);
    react_1.useEffect(function () {
        var _a;
        (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages.length, asking]);
    var updateActiveSession = react_1.useCallback(function (updater) {
        if (!activeSession)
            return;
        setSessions(function (current) { return current.map(function (session) { return session.id === activeSession.id ? updater(session) : session; }); });
    }, [activeSession]);
    function handleIndex() {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!video || indexing)
                            return [2 /*return*/];
                        setIndexing(true);
                        setIndexError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, api_1.indexTranscript(video.videoId, "en")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, storage_1.markVideoIndexed(video.videoId)];
                    case 3:
                        _a.sent();
                        setIndexedVideos(function (current) { return current.includes(video.videoId) ? current : __spreadArrays(current, [video.videoId]); });
                        setIndexedChunks(result.total_chunks);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        setIndexError(err_1 instanceof Error ? err_1.message : "Transcript indexing failed.");
                        return [3 /*break*/, 6];
                    case 5:
                        setIndexing(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function sendQuestion(rawQuestion, appendUserMessage) {
        if (appendUserMessage === void 0) { appendUserMessage = true; }
        return __awaiter(this, void 0, void 0, function () {
            var trimmedQuestion, userMessage_1, controller, assistantMessageId, streamedContent, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trimmedQuestion = rawQuestion.trim();
                        if (!video || !activeSession || !trimmedQuestion || asking || !isIndexed)
                            return [2 /*return*/];
                        if (appendUserMessage) {
                            userMessage_1 = { id: crypto.randomUUID(), role: "user", content: trimmedQuestion, createdAt: Date.now() };
                            updateActiveSession(function (session) { return (__assign(__assign({}, session), { title: session.messages.length === 0 ? trimmedQuestion.slice(0, 42) : session.title, messages: __spreadArrays(session.messages, [userMessage_1]), updatedAt: Date.now() })); });
                        }
                        setQuestion("");
                        setAsking(true);
                        setChatError(null);
                        setFailedQuestion(null);
                        controller = new AbortController();
                        abortControllerRef.current = controller;
                        assistantMessageId = crypto.randomUUID();
                        setStreamingMessageId(assistantMessageId);
                        streamedContent = "";
                        updateActiveSession(function (session) { return (__assign(__assign({}, session), { messages: __spreadArrays(session.messages, [{
                                    id: assistantMessageId, role: "assistant", content: "", sources: [], createdAt: Date.now()
                                }]), updatedAt: Date.now() })); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, api_1.streamVideoAnswer(video.videoId, trimmedQuestion, {
                                onToken: function (token) {
                                    streamedContent += token;
                                    updateActiveSession(function (session) { return (__assign(__assign({}, session), { messages: session.messages.map(function (message) { return message.id === assistantMessageId
                                            ? __assign(__assign({}, message), { content: streamedContent }) : message; }), updatedAt: Date.now() })); });
                                },
                                onSources: function (sources) {
                                    updateActiveSession(function (session) { return (__assign(__assign({}, session), { messages: session.messages.map(function (message) { return message.id === assistantMessageId
                                            ? __assign(__assign({}, message), { sources: sources }) : message; }), updatedAt: Date.now() })); });
                                }
                            }, controller.signal)];
                    case 2:
                        _a.sent();
                        if (!streamedContent) {
                            updateActiveSession(function (session) { return (__assign(__assign({}, session), { messages: session.messages.filter(function (message) { return message.id !== assistantMessageId; }) })); });
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _a.sent();
                        if (!streamedContent) {
                            updateActiveSession(function (session) { return (__assign(__assign({}, session), { messages: session.messages.filter(function (message) { return message.id !== assistantMessageId; }) })); });
                        }
                        if (err_2 instanceof DOMException && err_2.name === "AbortError") {
                            setChatError(streamedContent ? "Response stopped. Partial answer saved." : "Response stopped.");
                            setFailedQuestion(trimmedQuestion);
                        }
                        else {
                            setChatError(err_2 instanceof Error ? err_2.message : "Could not get answer.");
                            setFailedQuestion(trimmedQuestion);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (abortControllerRef.current === controller)
                            abortControllerRef.current = null;
                        setStreamingMessageId(function (current) { return current === assistantMessageId ? null : current; });
                        setAsking(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function stopGeneration() {
        var _a;
        (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort();
    }
    function copyAnswer(message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, navigator.clipboard.writeText(message.content)];
                    case 1:
                        _b.sent();
                        setCopiedMessageId(message.id);
                        window.setTimeout(function () { return setCopiedMessageId(function (current) { return current === message.id ? null : current; }); }, 1400);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        setChatError("Could not copy answer. Check clipboard permission.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function handleAsk(event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        return [4 /*yield*/, sendQuestion(question)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleNewSession() {
        return __awaiter(this, void 0, void 0, function () {
            var fresh;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!video)
                            return [2 /*return*/];
                        fresh = createSession(video);
                        return [4 /*yield*/, storage_1.saveSession(fresh)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, storage_1.setSelectedSession(video.videoId, fresh.id)];
                    case 2:
                        _a.sent();
                        setSessions(function (current) { return __spreadArrays(current, [fresh]); });
                        setSelectedByVideo(function (current) {
                            var _a;
                            return (__assign(__assign({}, current), (_a = {}, _a[video.videoId] = fresh.id, _a)));
                        });
                        setChatError(null);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleSelectSession(sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!video)
                            return [2 /*return*/];
                        return [4 /*yield*/, storage_1.setSelectedSession(video.videoId, sessionId)];
                    case 1:
                        _a.sent();
                        setSelectedByVideo(function (current) {
                            var _a;
                            return (__assign(__assign({}, current), (_a = {}, _a[video.videoId] = sessionId, _a)));
                        });
                        setChatError(null);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleDeleteSession(sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var remaining, fresh_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!video)
                            return [2 /*return*/];
                        return [4 /*yield*/, storage_1.removeSession(sessionId)];
                    case 1:
                        _a.sent();
                        remaining = videoSessions.filter(function (session) { return session.id !== sessionId; });
                        setSessions(function (current) { return current.filter(function (session) { return session.id !== sessionId; }); });
                        if (!(remaining.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, handleSelectSession(remaining[0].id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        fresh_1 = createSession(video);
                        return [4 /*yield*/, storage_1.saveSession(fresh_1)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, storage_1.setSelectedSession(video.videoId, fresh_1.id)];
                    case 5:
                        _a.sent();
                        setSessions(function (current) { return __spreadArrays(current, [fresh_1]); });
                        setSelectedByVideo(function (current) {
                            var _a;
                            return (__assign(__assign({}, current), (_a = {}, _a[video.videoId] = fresh_1.id, _a)));
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function handleRenameSession() {
        return __awaiter(this, void 0, void 0, function () {
            var title;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = renameValue.trim();
                        if (!title || !activeSession)
                            return [2 /*return*/];
                        updateActiveSession(function (session) { return (__assign(__assign({}, session), { title: title, updatedAt: Date.now() })); });
                        return [4 /*yield*/, storage_1.saveSession(__assign(__assign({}, activeSession), { title: title, updatedAt: Date.now() }))];
                    case 1:
                        _a.sent();
                        setRenaming(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    var sourceUrl = function (source) {
        var _a;
        if (source.youtube_url)
            return source.youtube_url;
        if (source.start_time !== null && video)
            return "" + video.url + (video.url.includes("?") ? "&" : "?") + "t=" + Math.floor(source.start_time) + "s";
        return (_a = video === null || video === void 0 ? void 0 : video.url) !== null && _a !== void 0 ? _a : "#";
    };
    return (React.createElement("main", { className: "flex min-h-screen flex-col bg-[#0b0d12] text-white" },
        React.createElement("header", { className: "flex items-center justify-between border-b border-white/10 px-4 py-4" },
            React.createElement("div", null,
                React.createElement("p", { className: "text-lg font-semibold tracking-tight" }, "VidQuery"),
                React.createElement("p", { className: "text-xs text-slate-400" }, "Your YouTube AI assistant")),
            React.createElement("button", { type: "button", onClick: function () { return void refresh(); }, className: "rounded-lg border border-white/15 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10" }, "Refresh")),
        React.createElement("section", { className: "flex flex-1 flex-col gap-3 p-3" },
            React.createElement("div", { className: "flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400" },
                React.createElement("span", { className: "h-2 w-2 rounded-full " + (status === "detected" ? "bg-emerald-400" : status === "loading" ? "bg-amber-400" : "bg-slate-500") }),
                status === "detected" ? "Video detected" : status === "loading" ? "Checking active tab" : status === "unavailable" ? "Extension unavailable" : "No supported video"),
            video ? (React.createElement("article", { className: "overflow-hidden rounded-2xl border border-white/10 bg-[#141821] shadow-xl shadow-black/20" },
                React.createElement("div", { className: "flex gap-3 p-3" },
                    React.createElement("img", { src: video.thumbnailUrl, alt: "Thumbnail for " + video.title, className: "h-16 w-28 rounded-lg object-cover", onError: function (event) { event.currentTarget.style.visibility = "hidden"; } }),
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("h1", { className: "line-clamp-2 text-xs font-semibold leading-5" }, video.title),
                        React.createElement("p", { className: "mt-1 break-all text-[10px] text-slate-500" }, video.videoId),
                        React.createElement("a", { href: video.url, target: "_blank", rel: "noreferrer", className: "mt-1 inline-flex text-[10px] text-red-300 hover:text-red-200" }, "Open on YouTube \u2197"))),
                React.createElement("div", { className: "px-3 pb-3" },
                    React.createElement("button", { type: "button", onClick: function () { return void handleIndex(); }, disabled: indexing || isIndexed, className: "w-full rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-400" }, indexing ? "Indexing transcript..." : isIndexed ? "Transcript indexed" : "Index this video"),
                    indexing && React.createElement("p", { className: "mt-2 text-center text-[10px] text-amber-300" }, "Fetching transcript and creating searchable chunks..."),
                    isIndexed && React.createElement("p", { className: "mt-2 text-center text-[10px] text-emerald-300" },
                        "Ready to chat",
                        indexedChunks ? " \u00B7 " + indexedChunks + " chunks indexed" : " · restored from saved state"),
                    indexError && React.createElement("p", { role: "alert", className: "mt-2 rounded-lg bg-red-400/10 p-2 text-[10px] text-red-200" }, indexError)))) : (React.createElement("div", { className: "rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center" },
                React.createElement("h1", { className: "text-sm font-semibold" }, status === "loading" ? "Detecting video..." : "Open a YouTube video"),
                React.createElement("p", { className: "mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-400" }, error !== null && error !== void 0 ? error : "Navigate to a YouTube watch page, Short, or live video. VidQuery detects active video automatically."))),
            video && sessionReady && (React.createElement("section", { className: "flex min-h-[26rem] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#11151d]" },
                React.createElement("div", { className: "flex items-center justify-between gap-2 border-b border-white/10 px-3 py-3" },
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        renaming ? React.createElement("form", { className: "flex gap-1", onSubmit: function (event) { event.preventDefault(); void handleRenameSession(); } },
                            React.createElement("input", { autoFocus: true, value: renameValue, onChange: function (event) { return setRenameValue(event.target.value); }, className: "min-w-0 flex-1 rounded bg-black/30 px-2 py-1 text-xs outline-none" }),
                            React.createElement("button", { className: "text-[10px] text-emerald-300" }, "Save")) : React.createElement("button", { type: "button", onClick: function () { var _a; setRenameValue((_a = activeSession === null || activeSession === void 0 ? void 0 : activeSession.title) !== null && _a !== void 0 ? _a : ""); setRenaming(true); }, className: "max-w-full truncate text-left text-xs font-semibold hover:text-red-200" }, (_d = activeSession === null || activeSession === void 0 ? void 0 : activeSession.title) !== null && _d !== void 0 ? _d : "Chat",
                            " ",
                            React.createElement("span", { className: "text-slate-500" }, "\u270E")),
                        React.createElement("p", { className: "mt-1 text-[10px] text-slate-500" },
                            videoSessions.length,
                            " ",
                            videoSessions.length === 1 ? "chat" : "chats",
                            " for this video")),
                    React.createElement("div", { className: "flex shrink-0 gap-1" },
                        React.createElement("button", { type: "button", onClick: function () { return void handleNewSession(); }, className: "rounded-lg bg-red-500/15 px-2.5 py-2 text-[10px] font-semibold text-red-200 hover:bg-red-500/25" }, "+ New"),
                        React.createElement("button", { type: "button", disabled: !activeSession, onClick: function () { return activeSession && void handleDeleteSession(activeSession.id); }, className: "rounded-lg border border-white/10 px-2 py-2 text-[10px] text-slate-400 hover:bg-white/10 disabled:opacity-40" }, "Delete"))),
                videoSessions.length > 1 && React.createElement("div", { className: "flex gap-1.5 overflow-x-auto border-b border-white/10 px-3 py-2" }, videoSessions.map(function (session) { return React.createElement("button", { key: session.id, type: "button", onClick: function () { return void handleSelectSession(session.id); }, className: "max-w-36 shrink-0 truncate rounded-lg px-2.5 py-1.5 text-[10px] " + ((activeSession === null || activeSession === void 0 ? void 0 : activeSession.id) === session.id ? "bg-white/15 text-white" : "bg-white/[0.04] text-slate-400 hover:bg-white/10") }, session.title); })),
                React.createElement("div", { ref: scrollRef, className: "flex flex-1 flex-col gap-3 overflow-y-auto p-3" },
                    !isIndexed && React.createElement("div", { className: "m-auto max-w-xs text-center text-xs leading-5 text-slate-500" }, "Index video transcript first. Saved conversations remain available after indexing state is restored."),
                    isIndexed && messages.length === 0 && React.createElement("div", { className: "my-auto" },
                        React.createElement("p", { className: "mb-3 text-center text-xs text-slate-400" }, "Ask anything about this video."),
                        React.createElement("div", { className: "grid grid-cols-1 gap-2" }, SUGGESTED_QUESTIONS.map(function (suggestion) { return React.createElement("button", { key: suggestion, type: "button", onClick: function () { return void sendQuestion(suggestion); }, disabled: asking, className: "rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-[11px] text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/5 disabled:opacity-50" },
                            suggestion,
                            " ",
                            React.createElement("span", { className: "float-right text-slate-600" }, "\u2197")); }))),
                    messages.map(function (message) { return React.createElement("article", { key: message.id, className: "max-w-[96%] rounded-xl p-3 " + (message.role === "user" ? "ml-auto bg-red-500/15 text-red-50" : "mr-auto bg-white/[0.06] text-slate-200") },
                        message.role === "assistant" ? React.createElement(MarkdownAnswer, { content: message.content }) : React.createElement("p", { className: "whitespace-pre-wrap text-xs leading-5" }, message.content),
                        message.role === "assistant" && message.content.trim().length > 0 && message.id !== streamingMessageId && React.createElement("div", { className: "mt-2 flex items-center justify-between border-t border-white/10 pt-2" },
                            React.createElement("span", { className: "text-[9px] text-slate-600" }, "VidQuery"),
                            React.createElement("button", { type: "button", onClick: function () { return void copyAnswer(message); }, className: "rounded-md px-2 py-1 text-[10px] text-slate-400 hover:bg-white/10 hover:text-white" }, copiedMessageId === message.id ? "Copied" : "Copy answer")),
                        message.sources && message.sources.length > 0 && React.createElement("details", { className: "group mt-2 border-t border-white/10 pt-2" },
                            React.createElement("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg py-1 text-[10px] font-semibold text-slate-400 transition hover:text-slate-200 [&::-webkit-details-marker]:hidden" },
                                React.createElement("span", null,
                                    "Sources (",
                                    message.sources.length,
                                    ")"),
                                React.createElement("span", { className: "inline-block text-xs transition-transform duration-200 group-open:rotate-180" }, "\u2304")),
                            React.createElement("div", { className: "mt-2 space-y-2" }, message.sources.map(function (source, index) { var _a; return React.createElement("a", { key: ((_a = source.chunk_id) !== null && _a !== void 0 ? _a : "source") + "-" + index, href: sourceUrl(source), target: "_blank", rel: "noreferrer", className: "block rounded-lg border border-white/5 bg-black/20 p-2 text-[11px] leading-4 text-sky-300 hover:border-sky-400/20 hover:bg-black/30" },
                                React.createElement("span", { className: "font-semibold" },
                                    source.start_time !== null ? formatTimestamp(source.start_time) : "Timestamp unavailable",
                                    source.end_time !== null ? " \u2013 " + formatTimestamp(source.end_time) : ""),
                                React.createElement("span", { className: "mt-1 block line-clamp-4 text-slate-400" }, source.content)); })))); }),
                    asking && React.createElement("div", { className: "mr-auto flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs text-slate-400" },
                        React.createElement("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" }),
                        "VidQuery is responding..."),
                    chatError && React.createElement("div", { role: "alert", className: "rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-[10px] leading-5 text-red-200" },
                        React.createElement("p", null, chatError),
                        failedQuestion && !asking && React.createElement("button", { type: "button", onClick: function () { return void sendQuestion(failedQuestion, false); }, className: "mt-2 rounded-md bg-red-400/15 px-2.5 py-1.5 font-semibold text-red-100 hover:bg-red-400/25" }, "Retry response"))),
                React.createElement("form", { onSubmit: function (event) { return void handleAsk(event); }, className: "flex gap-2 border-t border-white/10 p-3" },
                    React.createElement("input", { value: question, onChange: function (event) { return setQuestion(event.target.value); }, disabled: !isIndexed || asking, placeholder: isIndexed ? "Ask about this video..." : "Index video to start chatting", className: "min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-red-400/50 disabled:opacity-50" }),
                    asking ? React.createElement("button", { type: "button", onClick: stopGeneration, className: "rounded-xl border border-white/15 px-3 text-xs font-semibold text-slate-200 hover:bg-white/10" }, "Stop") : React.createElement("button", { type: "submit", disabled: !isIndexed || !question.trim(), className: "rounded-xl bg-red-500 px-4 text-xs font-semibold text-white hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500" }, "Send")))),
            !sessionReady && video && React.createElement("p", { className: "text-center text-xs text-slate-500" }, "Restoring saved chats..."))));
}
exports["default"] = VideoDetection;
