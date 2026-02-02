
let _ctx: AudioContext | null = null
let _oscL: OscillatorNode | null = null
let _oscR: OscillatorNode | null = null
let _gain: GainNode | null = null
let _panL: StereoPannerNode | null = null
let _panR: StereoPannerNode | null = null
let _lfo: OscillatorNode | null = null
let _lfoGain: GainNode | null = null

let _base = 240
let _beat = 6
let _level = 0.02
let _lfoDepth = 0.6
let _lfoFreq = 0.12

export function startAmbient(){
  try{
    if(_ctx) return
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
    if(!AudioCtx) return
    _ctx = new AudioCtx()

    _oscL = _ctx.createOscillator()
    _oscR = _ctx.createOscillator()
    _oscL.type = 'sine'
    _oscR.type = 'sine'
    _oscL.frequency.value = _base
    _oscR.frequency.value = _base + _beat

    _panL = _ctx.createStereoPanner()
    _panR = _ctx.createStereoPanner()
    _panL.pan.value = -0.6
    _panR.pan.value = 0.6

    _gain = _ctx.createGain()
    _gain.gain.value = Math.max(0.0001, _level)

    _oscL.connect(_panL); _panL.connect(_gain)
    _oscR.connect(_panR); _panR.connect(_gain)
    _gain.connect(_ctx.destination)

    // slow LFO to modulate gain (tremolo)
    _lfo = _ctx.createOscillator()
    _lfo.type = 'sine'
    _lfo.frequency.value = _lfoFreq
    _lfoGain = _ctx.createGain()
    _lfoGain.gain.value = (_level * _lfoDepth) || 0.001
    _lfo.connect(_lfoGain)
    // connect additive modulation to gain AudioParam
    _lfoGain.connect(_gain.gain)

    _oscL.start()
    _oscR.start()
    _lfo.start()

    // gentle fade in
    try{ _gain.gain.linearRampToValueAtTime(_level, _ctx.currentTime + 1.6) }catch(e){}
  }catch(e){ console.warn('ambient start failed', e) }
}

export function stopAmbient(){
  try{
    if(!_ctx) return
    try{ _oscL && _oscL.stop() }catch(e){}
    try{ _oscR && _oscR.stop() }catch(e){}
    try{ _lfo && _lfo.stop() }catch(e){}
    try{ _ctx.close() }catch(e){}
  }finally{
    _ctx = null; _oscL = null; _oscR = null; _gain = null; _panL = null; _panR = null; _lfo = null; _lfoGain = null
  }
}

export function setLevel(v:number){
  _level = Math.max(0, Math.min(0.2, v))
  try{
    if(_gain && _ctx){ _gain.gain.setTargetAtTime(_level, _ctx.currentTime, 0.3) }
    if(_lfoGain){ _lfoGain.gain.value = _level * _lfoDepth }
  }catch(e){}
}

export function setBeat(hz:number){
  _beat = hz
  try{ if(_oscR) _oscR.frequency.value = _base + _beat }catch(e){}
}

export function setBaseHz(hz:number){
  _base = hz
  try{ if(_oscL) _oscL.frequency.value = _base; if(_oscR) _oscR.frequency.value = _base + _beat }catch(e){}
}

export function isRunning(){
  return !!_ctx
}

