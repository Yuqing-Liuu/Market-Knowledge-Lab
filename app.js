const CATEGORIES = [
  { id: "mechanics", name: "Market Mechanics", zh: "市场运行机制" },
  { id: "options", name: "Options Playbook", zh: "期权玩法" },
  { id: "greeks", name: "Greeks & Volatility", zh: "希腊字母与波动率" },
  { id: "quant", name: "Quant Models", zh: "计量金融模型" },
  { id: "risk", name: "Risk & Portfolio", zh: "风险与组合" },
  { id: "fundamental", name: "Fundamentals", zh: "基本面" },
  { id: "macro", name: "Macro & Flows", zh: "宏观与资金流" },
  { id: "data", name: "Data & Tools", zh: "数据与工具" },
];

const TOPICS = [
  topic("stock-price", "股票为什么会涨跌", "Why Stocks Move", "mechanics", "basic", ["order-book", "liquidity", "earnings", "rates", "market-maker"], "价格不是因为某个新闻自动变化，而是买卖双方在订单簿里持续重新定价。短期看边际买卖盘、流动性和仓位压力；中期看盈利预期、估值倍数、资金流和利率。", ["新信息改变未来现金流预期", "资金被迫买入或卖出，例如指数调仓、止损、保证金", "流动性薄时，小订单也能造成大价格变化"], ["把涨跌解释成单一原因", "忽略成交量和可交易流动性", "只看新闻标题，不看预期差"]),
  topic("order-book", "订单簿", "Order Book / Level 2", "mechanics", "basic", ["bid-ask", "liquidity", "slippage", "market-order"], "订单簿展示不同价格上的限价买单和卖单。最优买价是 bid，最优卖价是 ask，它们之间的差就是 spread。", ["盘口厚度影响冲击成本", "大单可能隐藏或拆分", "Level 2 看到的是一部分流动性"], ["把挂单当成确定成交", "忽略撤单速度"]),
  topic("bid-ask", "买卖价差", "Bid / Ask / Spread", "mechanics", "basic", ["order-book", "liquidity", "market-maker"], "Spread 是即时交易的摩擦成本。流动性越差、波动越大、信息不对称越强，spread 往往越宽。", ["市价单买入通常打到 ask", "市价单卖出通常打到 bid", "期权 spread 往往比股票更重要"], ["只看中间价", "用不合理限价追逐成交"]),
  topic("market-order", "市价单与限价单", "Market / Limit / Stop Orders", "mechanics", "basic", ["order-book", "slippage", "liquidity"], "市价单优先成交但价格不确定；限价单控制价格但不保证成交；stop 单会在触发后变成市价或限价逻辑。", ["市价单适合流动性强且急需成交", "限价单适合控制滑点", "stop 在跳空行情里可能偏离预期"], ["把 stop 当成保证止损价", "在低流动性期权上用市价单"]),
  topic("liquidity", "流动性", "Liquidity", "mechanics", "basic", ["order-book", "slippage", "volume", "market-maker"], "流动性是你能以接近当前价格买卖的能力。成交量高不等于任何时刻都流动性好，盘口深度和做市质量也重要。", ["越缺流动性，越容易被订单推动", "小盘股和远 OTM 期权尤其需要看 spread", "财报和宏观事件会瞬间抽走流动性"], ["只看日成交量", "忽略盘前盘后流动性差异"]),
  topic("market-maker", "做市商", "Market Maker / Dealer", "mechanics", "intermediate", ["bid-ask", "delta-hedging", "gamma-squeeze", "pin-risk", "options-flow"], "做市商提供买卖报价，赚取价差并管理库存风险。期权做市商通常会用标的股票和其他期权动态对冲 Greeks。", ["做市商不是永远和你对赌方向", "他们最关心库存、波动率和对冲成本", "集中的期权仓位会影响他们的对冲行为"], ["把所有价格运动都归因于做市商操控", "忽略对冲可能双向发生"]),
  topic("short-selling", "做空", "Short Selling", "mechanics", "intermediate", ["borrow-fee", "short-squeeze", "margin", "stock-price"], "做空是借入股票卖出，期待未来低价买回归还。成本包括借券费、保证金、股息责任和被召回风险。", ["亏损理论上无限", "高 borrow fee 会侵蚀收益", "拥挤做空可能触发 squeeze"], ["只看 short interest", "忽略可借股票和 borrow rate"]),
  topic("borrow-fee", "借券费", "Borrow Fee", "mechanics", "intermediate", ["short-selling", "short-squeeze"], "借券费是做空者为借股票支付的年化成本。难借股票的费用可能极高，并会迫使空头提前平仓。", ["费用变化本身是拥挤程度信号", "高费率会提高 short squeeze 风险", "除权除息会改变做空现金流"], ["把 borrow fee 当成固定成本"]),
  topic("short-squeeze", "轧空", "Short Squeeze", "mechanics", "intermediate", ["short-selling", "borrow-fee", "gamma-squeeze", "volume"], "short squeeze 是空头被迫买回股票，买盘进一步推高价格，形成正反馈。它通常需要高空头拥挤度、价格上行触发点和有限流动性。", ["空头止损和保证金压力是燃料", "新闻或财报可能只是触发器", "gamma squeeze 可以叠加放大"], ["看到上涨就叫 squeeze", "忽略空头是否真的拥挤"]),
  topic("dark-pool", "暗池与场外成交", "Dark Pool / Off-Exchange", "mechanics", "advanced", ["liquidity", "order-book", "volume"], "暗池允许机构在不公开显示订单簿深度的场所成交。它能降低市场冲击，也会让公开盘口看起来不完整。", ["美股大量成交发生在交易所外", "成交仍会影响报价和价格发现", "暗池不是天然阴谋，也不是天然无害"], ["把暗池成交等同操控"]),

  topic("call-option", "看涨期权", "Call Option", "options", "basic", ["buy-call", "sell-call", "delta", "implied-volatility"], "call 给买方在到期前或到期日按 strike 买入标的的权利。买方付 premium，卖方收 premium 并承担交付义务。", ["call 价值来自内在价值和时间价值", "OTM call 便宜但归零概率高", "卖 call 的风险取决于是否持有标的"], ["把 call 当成低价股票替代品", "忽略流动性和 IV"]),
  topic("put-option", "看跌期权", "Put Option", "options", "basic", ["buy-put", "sell-put", "delta", "vol-skew"], "put 给买方按 strike 卖出标的的权利。它可用于做空、保护持仓，或通过卖 put 承担接货义务。", ["put 常用于下跌保护", "指数和股票 put 往往带有保护需求溢价", "卖 put 的风险接近以 strike 持股"], ["把卖 put 当成存款利息", "忽略跳空和保证金"]),
  topic("buy-call", "买入看涨期权", "Buy Call", "options", "basic", ["call-option", "delta", "theta", "implied-volatility", "earnings-play"], "买 call 是用期权费换取上行凸性。它的收益来自标的上涨、IV 上升或两者叠加，但时间价值会持续衰减。", ["最大亏损是 premium", "需要涨得够快、够多", "财报前 IV 高时，方向对也可能亏"], ["只看便宜的 OTM call", "忽略 theta 和 IV crush"]),
  topic("buy-put", "买入看跌期权", "Buy Put", "options", "basic", ["put-option", "delta", "theta", "protective-put"], "买 put 是为下跌或保护组合付保险费。它在下跌、波动率上升时受益，但长期连续买保护成本很高。", ["可用于投机下跌或保护持仓", "市场恐慌时 put 可能同时赚方向和 IV", "平静期买远期保护通常更贵"], ["把保护成本当成无摩擦"]),
  topic("sell-put", "卖出看跌期权", "Sell Put / Cash-Secured Put", "options", "basic", ["put-option", "wheel", "assignment", "margin", "theta"], "sell put 本质是收取 premium，承担在 strike 买入股票的义务。现金担保卖 put 常被用来以目标价接股票。", ["最大收益是 premium", "下跌风险接近持股", "适合你愿意拥有标的的价格区间"], ["为了高 premium 卖不想持有的股票", "忽略财报和跳空风险"]),
  topic("sell-call", "卖出看涨期权", "Sell Call", "options", "intermediate", ["call-option", "covered-call", "assignment", "margin"], "sell call 收取 premium，承担在 strike 卖出标的的义务。裸卖 call 理论风险无限，备兑卖 call 则用持股覆盖交付。", ["covered call 是常见收入策略", "裸卖 call 需要极强风控", "除息和深 ITM 会影响提前行权"], ["把裸卖 call 当成高胜率小钱策略"]),
  topic("covered-call", "备兑看涨", "Covered Call", "options", "basic", ["sell-call", "assignment", "rollover", "theta"], "covered call 是持有股票同时卖 call，拿 premium 换取部分上行空间。适合震荡或温和上涨预期。", ["降低持仓成本", "上涨超过 strike 会被限制收益", "可通过 rolling 调整上限和期限"], ["以为它没有风险", "在强趋势股上过早封顶"]),
  topic("protective-put", "保护性看跌", "Protective Put", "options", "basic", ["buy-put", "tail-risk", "portfolio-beta"], "protective put 是持有股票同时买 put，用 premium 换取下方保护。它像保险，降低尾部风险但拖累长期收益。", ["适合不想卖出持仓但担心下跌", "保护范围由 strike 和期限决定", "市场恐慌时保险会变贵"], ["只买保护不管理成本", "保护期限和风险期限不匹配"]),
  topic("wheel", "轮子策略", "Wheel Strategy", "options", "intermediate", ["sell-put", "covered-call", "assignment", "rollover"], "Wheel 是先卖 cash-secured put，若被指派则持股，再卖 covered call。它把收租逻辑和持股逻辑连起来。", ["核心是标的选择和仓位控制", "premium 不是免费午餐", "极端下跌会把策略变成高成本持股"], ["只看月收入率", "忽略集中风险和税务"]),
  topic("rollover", "移仓 / 滚仓", "Rollover", "options", "intermediate", ["covered-call", "sell-put", "assignment", "theta"], "rollover 是平掉旧期权并开新期权，用 strike、到期日和 premium 重新安排风险。它不是魔法止损，只是把风险换形状。", ["roll out 延长时间", "roll up/down 改变行权价", "credit/debit 决定现金流方向"], ["把 rolling 当成永不亏损", "只看 credit 不看总风险"]),
  topic("vertical-spread", "垂直价差", "Vertical Spread", "options", "intermediate", ["buy-call", "sell-put", "risk-reward", "implied-volatility"], "vertical spread 同时买卖同到期、不同 strike 的期权，用封顶收益换取更低成本或更明确风险。", ["bull call spread 降低买 call 成本", "put credit spread 是有限风险 sell put", "最大盈亏在建仓时可估算"], ["忽略宽 spread 的成交摩擦"]),
  topic("straddle", "跨式", "Straddle / Strangle", "options", "intermediate", ["implied-volatility", "realized-volatility", "earnings-play"], "straddle 买入同 strike call 和 put，赌大波动；strangle 用不同 strike 降成本但需要更大移动。卖方则是在卖波动率。", ["关键是 realized move 是否超过 implied move", "财报前后常用", "卖跨式尾部风险很大"], ["只猜方向，不比较隐含波动"]),
  topic("iron-condor", "铁鹰", "Iron Condor", "options", "advanced", ["vertical-spread", "theta", "implied-volatility", "risk-reward"], "iron condor 通过卖出上下两侧价差，押注价格留在区间内。它赚 theta 和 IV 回落，但怕趋势突破。", ["适合区间和高 IV 环境", "收益有限，风险有限但可能大于收益", "需要管理到期和尾部"], ["把高胜率误解成高期望"]),
  topic("assignment", "行权与指派", "Exercise / Assignment", "options", "basic", ["sell-put", "covered-call", "pin-risk"], "美式期权可能提前行权，卖方可能被指派。股息、深 ITM、流动性和到期日都会影响指派概率。", ["sell put 被指派会买入股票", "covered call 被指派会卖出股票", "除息日前 call 提前行权风险上升"], ["以为只有到期才会发生"]),
  topic("zero-dte", "0DTE 期权", "0DTE Options", "options", "advanced", ["gamma", "theta", "pin-risk", "dealer-gex"], "0DTE 是当天到期的期权，theta 和 gamma 都非常极端。它可能放大盘中对冲流，也可能迅速归零。", ["时间价值消失很快", "接近 strike 时 gamma 很高", "适合严格风险控制的短线结构"], ["把小 premium 当低风险", "无止损卖裸期权"]),

  topic("greeks", "希腊字母总览", "Option Greeks", "greeks", "basic", ["delta", "gamma", "vega", "theta", "black-scholes"], "Greeks 是期权风险语言，用来拆解价格对标的、时间、波动率和利率变化的敏感度。", ["Delta 看方向", "Gamma 看 delta 变化速度", "Vega 看 IV", "Theta 看时间衰减"], ["只看单个 Greek", "忽略 Greeks 会随价格和时间变化"]),
  topic("delta", "Delta", "Delta", "greeks", "basic", ["greeks", "buy-call", "delta-hedging", "gamma", "beta"], "Delta 近似表示标的价格变动 1 美元时期权价格的变化，也常被粗略理解为到期 ITM 概率的影子。", ["call delta 通常为正", "put delta 通常为负", "组合 delta 衡量方向暴露"], ["把 delta 当固定值", "忽略 gamma 会改变 delta"]),
  topic("gamma", "Gamma", "Gamma", "greeks", "intermediate", ["delta", "gamma-squeeze", "zero-dte", "dealer-gex"], "Gamma 衡量 delta 对标的价格的敏感度。接近到期、接近 ATM 的期权 gamma 通常最高。", ["长 gamma 喜欢大波动", "短 gamma 害怕快速移动", "dealer gamma 状态会影响对冲方向"], ["只看 delta 不看 gamma"]),
  topic("vega", "Vega", "Vega", "greeks", "basic", ["implied-volatility", "straddle", "earnings-play"], "Vega 衡量隐含波动率变化对期权价格的影响。远期和 ATM 期权通常 vega 更高。", ["买期权通常长 vega", "卖期权通常短 vega", "财报后 IV crush 会伤害长 vega"], ["方向对却忘了 IV 变化"]),
  topic("theta", "Theta", "Theta", "greeks", "basic", ["sell-put", "covered-call", "zero-dte"], "Theta 是时间价值衰减。买方支付 theta，卖方收取 theta，但卖方承担尾部风险。", ["越接近到期，ATM theta 越快", "周末和假期也反映在定价里", "高 theta 往往伴随高 gamma 风险"], ["把 theta 当稳定工资"]),
  topic("implied-volatility", "隐含波动率", "Implied Volatility", "greeks", "basic", ["vega", "iv-rank", "vol-skew", "straddle"], "IV 是市场从期权价格反推的未来波动率预期。它不是方向预测，而是波动幅度和风险溢价的价格。", ["IV 高说明期权贵，但可能有原因", "IV 低不代表一定便宜", "事件前 IV 常上升，事件后回落"], ["只看 IV 高低，不和 realized vol 比"]),
  topic("realized-volatility", "实现波动率", "Realized Volatility", "greeks", "intermediate", ["implied-volatility", "garch", "straddle"], "实现波动率是标的已经发生的历史波动。交易波动率时，核心问题是未来 realized vol 是否超过当前 implied vol。", ["常用日收益率标准差年化", "窗口选择会影响结论", "跳空和尾部事件很关键"], ["用过去波动机械预测未来"]),
  topic("iv-rank", "IV Rank / Percentile", "IV Rank / IV Percentile", "greeks", "intermediate", ["implied-volatility", "theta", "iron-condor"], "IV Rank 比较当前 IV 在过去区间中的位置，帮助判断期权相对贵不贵。Percentile 则看过去有多少天低于当前水平。", ["适合筛选卖波动环境", "不同标的不能直接硬比", "事件会让历史分位失真"], ["看到高 IV 就无脑卖"]),
  topic("vol-skew", "波动率偏斜", "Volatility Smile / Skew", "greeks", "advanced", ["implied-volatility", "put-option", "tail-risk"], "skew 描述不同 strike 的 IV 差异。股票指数常见 put skew，因为市场愿意为下跌保护支付更高价格。", ["skew 反映供需和尾部风险", "单股票财报前 skew 可能异常", "spread 策略会受到 skew 影响"], ["只用单一 IV 描述整条期权链"]),
  topic("gamma-squeeze", "Gamma 挤压", "Gamma Squeeze", "greeks", "advanced", ["gamma", "market-maker", "delta-hedging", "options-flow", "dealer-gex", "short-squeeze"], "gamma squeeze 是期权仓位迫使做市商动态买入或卖出标的，从而放大价格运动的正反馈。", ["大量短期期权成交", "call/put OI 集中在关键 strike", "标的流动性不足", "价格接近高 gamma 区域"], ["不是所有买 call 都会 squeeze", "dealer 仓位方向不透明"]),
  topic("delta-hedging", "Delta 对冲", "Delta Hedging", "greeks", "advanced", ["delta", "gamma", "market-maker", "gamma-squeeze"], "delta hedging 是通过买卖标的或相关工具，使组合方向暴露接近目标值。期权做市商会随价格和时间动态调整。", ["短 gamma 时可能追涨杀跌", "长 gamma 时可能高卖低买", "对冲成本进入期权价格"], ["忽略对冲是连续变化的"]),
  topic("dealer-gex", "Dealer GEX", "Gamma Exposure", "greeks", "advanced", ["gamma", "gamma-squeeze", "pin-risk", "zero-dte"], "GEX 估算做市商/交易商因期权仓位产生的 gamma 暴露。它是推断市场微观结构的工具，不是确定真相。", ["正 GEX 常被认为抑制波动", "负 GEX 常被认为放大波动", "需要假设客户买卖方向"], ["把第三方 GEX 当精确数据"]),
  topic("pin-risk", "Pin Risk", "Pin Risk / Max Pain", "greeks", "advanced", ["assignment", "dealer-gex", "zero-dte"], "pin risk 是到期时标的价格靠近某个 strike，期权是否 ITM 变得不确定，导致仓位和指派风险难管理。", ["周五收盘附近尤其明显", "after-hours 移动也可能影响指派", "max pain 只是观察工具"], ["把 max pain 当磁铁定律"]),

  topic("alpha", "Alpha", "Alpha", "quant", "basic", ["beta", "capm", "factor-model"], "Alpha 是超出风险暴露解释后的剩余收益。真实 alpha 很难稳定存在，因为它会被竞争、交易成本和容量消耗。", ["要扣除 beta 和因子暴露", "需要考虑交易成本", "样本外表现比回测更重要"], ["把绝对收益直接叫 alpha"]),
  topic("beta", "Beta", "Beta", "quant", "basic", ["alpha", "capm", "portfolio-beta"], "Beta 衡量资产对市场收益的敏感度。beta 为 1 表示大致随市场同幅波动，beta 更高表示方向暴露更强。", ["杠杆会放大 beta", "行业和周期会改变 beta", "短窗口估计不稳定"], ["把低 beta 当低风险的全部"]),
  topic("capm", "CAPM", "Capital Asset Pricing Model", "quant", "basic", ["alpha", "beta", "risk-premium"], "CAPM 用市场 beta 解释预期收益：资产预期收益等于无风险利率加 beta 乘市场风险溢价。", ["是基准模型，不是完整现实", "常用于估算权益成本", "alpha 是 CAPM 解释不了的部分"], ["把模型输出当精确真值"]),
  topic("factor-model", "因子模型", "Factor Model", "quant", "intermediate", ["alpha", "beta", "fama-french", "momentum-factor"], "因子模型把收益拆成多个系统性风险暴露，例如市场、规模、价值、动量、质量和低波动。", ["帮助区分选股能力和风格暴露", "可用于组合归因", "因子会拥挤和周期失效"], ["用太多因子过拟合"]),
  topic("fama-french", "Fama-French 因子", "Fama-French Factors", "quant", "intermediate", ["factor-model", "value-factor", "size-factor"], "Fama-French 模型从市场因子扩展到规模、价值、盈利能力和投资风格等因子。", ["常用于学术和组合归因", "解释长期横截面收益差异", "不能保证未来因子溢价"], ["把历史显著性当未来保证"]),
  topic("garch", "GARCH", "GARCH Volatility Model", "quant", "advanced", ["realized-volatility", "implied-volatility", "risk"], "GARCH 用过去的冲击和波动预测未来条件波动率，常用于风险管理和波动建模。", ["波动率会聚集", "模型对极端跳跃有限", "参数估计依赖窗口"], ["以为统计模型能预测方向"]),
  topic("black-scholes", "Black-Scholes-Merton", "Black-Scholes Model", "quant", "intermediate", ["implied-volatility", "greeks", "buy-call"], "BSM 是欧式期权定价经典模型，输入标的价、strike、时间、利率、波动率，输出理论价格和 Greeks。", ["核心假设包括连续交易和恒定波动率", "实际市场用 IV 曲面修正", "Greeks 仍然是风险语言"], ["把公式价格当市场应然价格"]),
  topic("monte-carlo", "蒙特卡洛模拟", "Monte Carlo Simulation", "quant", "intermediate", ["risk", "var", "black-scholes"], "蒙特卡洛通过大量随机路径估计结果分布，适合复杂 payoff、路径依赖产品和组合风险。", ["输出是分布，不是单点预测", "假设分布决定结果质量", "样本数影响稳定性"], ["模拟得很精细但假设很脆"]),
  topic("backtesting", "回测", "Backtesting", "data", "intermediate", ["alpha", "factor-model", "slippage", "risk-reward"], "回测用历史数据检验策略规则。它能帮你排除坏想法，但不能证明未来赚钱。", ["要包含交易成本和滑点", "避免未来函数", "样本外和 walk-forward 更可靠"], ["过拟合", "幸存者偏差", "忽略容量"]),

  topic("risk", "风险总览", "Risk Management", "risk", "basic", ["position-sizing", "drawdown", "tail-risk", "margin"], "风险管理不是预测哪里会跌，而是确保预测错了也不会被迫出局。它把仓位、杠杆、相关性和尾部损失放在同一张表里。", ["先定义不可承受损失", "再决定仓位和工具", "最后才讨论收益目标"], ["只管理单笔交易", "忽略组合相关性"]),
  topic("position-sizing", "仓位管理", "Position Sizing", "risk", "basic", ["risk", "risk-reward", "drawdown", "margin"], "仓位管理决定单笔错误会伤你多重。好的策略也会因为仓位过大而破产。", ["先定义最大可承受亏损", "期权要看最大亏损和尾部", "相关仓位要合并看"], ["用信心替代风险预算"]),
  topic("margin", "保证金与杠杆", "Margin / Leverage", "risk", "intermediate", ["sell-put", "short-selling", "position-sizing"], "杠杆放大收益和亏损，也会引入强平和追加保证金风险。期权卖方尤其需要理解保证金变化。", ["波动上升会提高保证金", "集中仓位更危险", "隔夜跳空绕过止损"], ["把可用保证金当可用风险"]),
  topic("risk-reward", "收益风险比", "Risk / Reward", "risk", "basic", ["vertical-spread", "iron-condor", "position-sizing"], "收益风险比描述潜在收益和潜在亏损，但必须结合概率和尾部损失看。高胜率策略可能期望值很差。", ["期望值 = 概率加权收益", "最大亏损不等于常见亏损", "payoff 形状很重要"], ["只看胜率"]),
  topic("var", "VaR / CVaR", "Value at Risk", "risk", "advanced", ["monte-carlo", "tail-risk", "portfolio-beta"], "VaR 估计在给定置信度下的损失阈值，CVaR 估计超过阈值后的平均损失。", ["CVaR 更关注尾部", "历史法、参数法、模拟法各有缺陷", "风险模型会在危机时失效"], ["把 95% VaR 当最坏情况"]),
  topic("tail-risk", "尾部风险", "Tail Risk", "risk", "advanced", ["buy-put", "vol-skew", "var"], "尾部风险是低概率但高损失事件。卖期权、杠杆、多头拥挤和流动性错配都会积累尾部风险。", ["平时看起来稳定", "压力期相关性上升", "保护通常在你想买时变贵"], ["用短期平稳收益低估尾部"]),
  topic("drawdown", "回撤", "Drawdown", "risk", "basic", ["position-sizing", "risk-reward"], "回撤衡量从资产峰值到低点的跌幅。恢复大回撤需要非线性更高的收益。", ["亏 50% 需要涨 100% 回本", "心理承受力也是约束", "控制回撤能延长策略寿命"], ["只看年化收益"]),
  topic("portfolio-beta", "组合 Beta", "Portfolio Beta", "risk", "intermediate", ["beta", "hedge-ratio", "position-sizing"], "组合 beta 是所有持仓对市场暴露的加权结果。看起来分散的股票组合可能本质上都是同一个因子。", ["同主题股票相关性很高", "期权 delta 也贡献 beta", "可用指数期货/ETF 对冲"], ["按 ticker 数量假装分散"]),
  topic("hedge-ratio", "对冲比例", "Hedge Ratio", "risk", "advanced", ["portfolio-beta", "delta-hedging"], "对冲比例决定用多少对冲工具抵消目标风险。可以按 dollar exposure、beta、delta 或统计关系计算。", ["股票组合常用 beta hedge", "期权组合常用 delta hedge", "对冲会引入基差风险"], ["追求完美对冲导致过度交易"]),

  topic("earnings", "财报与预期差", "Earnings / Expectations", "fundamental", "basic", ["stock-price", "earnings-play", "implied-volatility"], "股票对财报的反应取决于结果相对预期，而不是绝对好坏。价格之前已经反映了市场的共识和仓位。", ["beat 也可能跌", "guidance 往往比历史业绩重要", "期权 IV 会定价预期波动"], ["只看 EPS beat/miss"]),
  topic("valuation", "估值倍数", "Valuation Multiples", "fundamental", "basic", ["rates", "dcf", "stock-price"], "估值倍数把价格和基本面指标连接起来，例如 P/E、EV/Sales、EV/EBITDA。高增长、高质量和低利率通常支持更高倍数。", ["倍数是预期的压缩表达", "不同商业模式不能直接比", "利率变化会影响远期现金流估值"], ["便宜一定会上涨", "贵一定会下跌"]),
  topic("dcf", "DCF", "Discounted Cash Flow", "fundamental", "intermediate", ["valuation", "rates", "risk-premium"], "DCF 用未来自由现金流折现估计企业价值。它迫使你显式表达增长、利润率、再投资和折现率假设。", ["终值常决定大部分估值", "折现率小变动影响很大", "适合做情景分析"], ["假装精确到小数点"]),
  topic("buyback", "回购与稀释", "Buyback / Dilution", "fundamental", "intermediate", ["eps", "valuation"], "回购减少股份数，可能提高每股指标；股权激励和增发会稀释股东。关键看回购价格和资本配置质量。", ["低估时回购更有价值", "高 SBC 会抵消回购", "净稀释影响长期股东回报"], ["只看回购总金额"]),
  topic("eps", "EPS", "Earnings Per Share", "fundamental", "basic", ["earnings", "buyback", "valuation"], "EPS 是每股收益，受净利润和股份数共同影响。它是常用指标，但容易被一次性项目和会计处理扭曲。", ["non-GAAP 和 GAAP 要区分", "回购会影响 EPS", "现金流质量很重要"], ["只看 EPS 不看收入和现金流"]),
  topic("earnings-play", "财报期权玩法", "Earnings Play", "options", "advanced", ["earnings", "straddle", "implied-volatility", "vega"], "财报玩法本质是在交易预期波动、方向或 IV crush。买方需要实际波动超过隐含波动，卖方承担跳空尾部风险。", ["比较 implied move 和历史 move", "看 skew 和 liquidity", "避免裸卖无法承受的风险"], ["只猜涨跌", "忽略 IV crush"]),

  topic("rates", "利率", "Interest Rates", "macro", "basic", ["valuation", "dcf", "risk-premium", "yield-curve"], "利率是资产定价的重力。更高折现率会压低远期现金流现值，也会提高现金和债券的竞争力。", ["成长股久期更长", "金融股受利率曲线影响", "利率预期比当前利率更影响市场"], ["只看 Fed 当天决定"]),
  topic("yield-curve", "收益率曲线", "Yield Curve", "macro", "intermediate", ["rates", "recession-risk"], "收益率曲线展示不同期限国债收益率。倒挂常被视为衰退风险信号，但时点和市场反应并不机械。", ["长端反映增长和通胀预期", "短端更受央行政策影响", "曲线形状影响银行和估值"], ["看到倒挂就立刻做空"]),
  topic("risk-premium", "风险溢价", "Risk Premium", "macro", "intermediate", ["capm", "rates", "valuation"], "风险溢价是投资者为承担不确定性要求的额外收益。市场恐慌时风险溢价上升，估值通常承压。", ["权益风险溢价连接股票和债券", "信用利差是风险偏好的窗口", "流动性会影响溢价"], ["只看盈利不看折现率"]),
  topic("sector-rotation", "板块轮动", "Sector Rotation", "macro", "intermediate", ["rates", "momentum-factor", "liquidity"], "板块轮动是资金在不同主题、行业和因子之间迁移。它常由利率、盈利周期、政策和拥挤度触发。", ["强势主题会吸走流动性", "防御/周期/成长风格交替", "ETF 流入会放大趋势"], ["把所有轮动解释成基本面"]),
  topic("dollar-index", "美元指数", "Dollar Index", "macro", "intermediate", ["rates", "earnings"], "美元走强会影响跨国公司收入折算、商品价格和全球流动性。它是宏观风险偏好的重要变量之一。", ["强美元压制海外收入折算", "新兴市场压力上升", "商品常受美元影响"], ["孤立看美元，不看利差和风险偏好"]),

  topic("volume", "成交量", "Volume / Relative Volume", "data", "basic", ["liquidity", "stock-price", "short-squeeze"], "成交量显示交易活跃度。相对成交量能帮助识别事件驱动或资金流异常。", ["放量突破更值得关注", "高量下跌可能是分歧或出货", "期权 volume 要和 OI 一起看"], ["把成交量当方向信号"]),
  topic("options-flow", "期权订单流", "Options Flow", "data", "advanced", ["market-maker", "gamma-squeeze", "open-interest"], "期权订单流追踪大额或异常期权成交。它能提示市场兴趣，但单笔成交无法告诉你完整意图。", ["要分清买方/卖方发起", "结合 OI 判断开仓还是平仓", "spread 组合容易被误读"], ["看到大单就跟单"]),
  topic("open-interest", "未平仓量", "Open Interest", "data", "intermediate", ["options-flow", "gamma-squeeze", "pin-risk"], "OI 是尚未平仓的期权合约数。它反映存量仓位，不等于当天成交，也不直接告诉你方向。", ["OI 集中 strike 可能影响到期行为", "成交量增加后次日 OI 才确认", "OI 要结合价格和成交方向"], ["把 OI 全部当多头买入"]),
  topic("option-chain", "期权链", "Option Chain", "data", "basic", ["bid-ask", "implied-volatility", "open-interest"], "期权链列出不同到期日和 strike 的 call/put 报价、Greeks、IV、volume 和 OI。", ["先看 liquidity 和 spread", "再看 IV、delta、OI", "不同到期日代表不同时间风险"], ["只看 premium 便宜"]),
  topic("vwap", "VWAP", "Volume Weighted Average Price", "data", "basic", ["volume", "order-book"], "VWAP 是成交量加权平均价，常被机构用作执行基准。盘中价格相对 VWAP 也常被短线交易者观察。", ["大单执行追求接近 VWAP", "趋势日可能沿 VWAP 单边运行", "震荡日 VWAP 可能成为均值"], ["把 VWAP 当万能支撑阻力"]),
  topic("slippage", "滑点", "Slippage", "data", "basic", ["market-order", "liquidity", "backtesting"], "滑点是预期成交价和实际成交价的差。回测如果不计滑点，策略表现常被严重美化。", ["低流动性、快行情、宽 spread 都会增加滑点", "期权滑点常比股票更大", "市价单更容易滑"], ["用中间价回测期权"]),
  topic("moving-average", "移动平均线", "Moving Averages", "data", "basic", ["momentum-factor", "sector-rotation"], "移动平均线平滑价格，用于观察趋势和均值回归。它是描述工具，不是因果机制。", ["短均线反应快但噪音多", "长均线反应慢但更稳定", "趋势策略要配合风险控制"], ["金叉死叉机械交易"]),
  topic("momentum-factor", "动量因子", "Momentum Factor", "quant", "intermediate", ["factor-model", "moving-average", "sector-rotation"], "动量因子捕捉过去赢家继续跑赢的现象。它常有趋势收益，也会在反转期经历剧烈回撤。", ["受资金流和行为偏差支持", "拥挤时反转风险高", "可用于股票和板块"], ["追高不设退出"]),
  topic("value-factor", "价值因子", "Value Factor", "quant", "intermediate", ["factor-model", "valuation"], "价值因子偏好价格相对基本面便宜的资产。它长期有研究支持，但会经历多年失效周期。", ["便宜可能是风险补偿", "价值陷阱需要基本面过滤", "利率和周期影响表现"], ["低估值等于低风险"]),
  topic("size-factor", "规模因子", "Size Factor", "quant", "intermediate", ["fama-french", "factor-model"], "规模因子关注小市值股票相对大市值股票的收益差异。现实中流动性、质量和交易成本会显著影响可实现收益。", ["小盘更受流动性影响", "风险和收益都更不稳定", "组合化比单票更可靠"], ["忽略交易成本和退市偏差"]),
  topic("recession-risk", "衰退风险", "Recession Risk", "macro", "intermediate", ["yield-curve", "risk-premium", "earnings"], "衰退风险会同时影响盈利预期、信用利差、风险偏好和估值倍数。市场通常提前交易概率，而不是等数据确认。", ["失业率、PMI、信用利差常被观察", "防御板块可能相对强", "降息不一定立刻利好股票"], ["把经济数据和市场反应线性对应"]),
];

const state = {
  activeCategory: "all",
  activeTopic: "gamma-squeeze",
  search: "",
  sort: "name",
  view: "map",
  focusList: [],
  calendar: [],
  news: [],
  researchItems: [],
  researchFilter: "All",
  activeResearchId: "",
};

const els = {
  categoryNav: document.querySelector("#categoryNav"),
  categorySummary: document.querySelector("#categorySummary"),
  topicList: document.querySelector("#topicList"),
  topicCount: document.querySelector("#topicCount"),
  topicDetail: document.querySelector("#topicDetail"),
  searchInput: document.querySelector("#searchInput"),
  pageTitle: document.querySelector("#pageTitle"),
  sortSelect: document.querySelector("#sortSelect"),
  graph: document.querySelector("#knowledgeGraph"),
  focusBtn: document.querySelector("#focusBtn"),
  viewTabs: document.querySelectorAll(".view-tab"),
  mapView: document.querySelector("#mapView"),
  labView: document.querySelector("#labView"),
  focusView: document.querySelector("#focusView"),
  researchView: document.querySelector("#researchView"),
  calendarView: document.querySelector("#calendarView"),
  newsView: document.querySelector("#newsView"),
  finnhubKeyInput: document.querySelector("#finnhubKeyInput"),
  saveFinnhubKeyBtn: document.querySelector("#saveFinnhubKeyBtn"),
  focusStats: document.querySelector("#focusStats"),
  focusList: document.querySelector("#focusList"),
  focusCount: document.querySelector("#focusCount"),
  focusForm: document.querySelector("#focusForm"),
  focusSymbol: document.querySelector("#focusSymbol"),
  focusPriority: document.querySelector("#focusPriority"),
  focusStatus: document.querySelector("#focusStatus"),
  focusPrice: document.querySelector("#focusPrice"),
  focusThesis: document.querySelector("#focusThesis"),
  focusCatalyst: document.querySelector("#focusCatalyst"),
  focusRisk: document.querySelector("#focusRisk"),
  focusAction: document.querySelector("#focusAction"),
  refreshFocusBtn: document.querySelector("#refreshFocusBtn"),
  exportFocusBtn: document.querySelector("#exportFocusBtn"),
  importFocusInput: document.querySelector("#importFocusInput"),
  researchStats: document.querySelector("#researchStats"),
  researchFilters: document.querySelector("#researchFilters"),
  researchCount: document.querySelector("#researchCount"),
  researchCards: document.querySelector("#researchCards"),
  researchDetail: document.querySelector("#researchDetail"),
  researchUpdated: document.querySelector("#researchUpdated"),
  researchForm: document.querySelector("#researchForm"),
  researchId: document.querySelector("#researchId"),
  researchTicker: document.querySelector("#researchTicker"),
  researchCompany: document.querySelector("#researchCompany"),
  researchStatus: document.querySelector("#researchStatus"),
  researchConviction: document.querySelector("#researchConviction"),
  researchConvictionValue: document.querySelector("#researchConvictionValue"),
  researchSector: document.querySelector("#researchSector"),
  researchIndustry: document.querySelector("#researchIndustry"),
  researchMarketCap: document.querySelector("#researchMarketCap"),
  researchSectionFields: document.querySelector("#researchSectionFields"),
  newResearchBtn: document.querySelector("#newResearchBtn"),
  clearResearchFormBtn: document.querySelector("#clearResearchFormBtn"),
  exportResearchBtn: document.querySelector("#exportResearchBtn"),
  importResearchInput: document.querySelector("#importResearchInput"),
  calendarStats: document.querySelector("#calendarStats"),
  calendarList: document.querySelector("#calendarList"),
  calendarCount: document.querySelector("#calendarCount"),
  calendarForm: document.querySelector("#calendarForm"),
  eventDate: document.querySelector("#eventDate"),
  eventTitle: document.querySelector("#eventTitle"),
  eventType: document.querySelector("#eventType"),
  eventImportance: document.querySelector("#eventImportance"),
  eventStatus: document.querySelector("#eventStatus"),
  eventTicker: document.querySelector("#eventTicker"),
  eventImpact: document.querySelector("#eventImpact"),
  eventSource: document.querySelector("#eventSource"),
  eventAction: document.querySelector("#eventAction"),
  exportCalendarBtn: document.querySelector("#exportCalendarBtn"),
  importCalendarInput: document.querySelector("#importCalendarInput"),
  newsTickers: document.querySelector("#newsTickers"),
  newsLookback: document.querySelector("#newsLookback"),
  newsFilter: document.querySelector("#newsFilter"),
  newsStats: document.querySelector("#newsStats"),
  newsList: document.querySelector("#newsList"),
  newsCount: document.querySelector("#newsCount"),
  loadDefaultNewsBtn: document.querySelector("#loadDefaultNewsBtn"),
  refreshNewsBtn: document.querySelector("#refreshNewsBtn"),
  translateNewsBtn: document.querySelector("#translateNewsBtn"),
  strategySelect: document.querySelector("#strategySelect"),
  spotInput: document.querySelector("#spotInput"),
  strikeInput: document.querySelector("#strikeInput"),
  premiumInput: document.querySelector("#premiumInput"),
  payoffStats: document.querySelector("#payoffStats"),
  payoffChart: document.querySelector("#payoffChart"),
};

const topicById = Object.fromEntries(TOPICS.map((item) => [item.id, item]));
const categoryById = Object.fromEntries(CATEGORIES.map((item) => [item.id, item]));
const difficultyRank = { basic: 1, intermediate: 2, advanced: 3 };
const FOCUS_KEY = "market-knowledge-focus-v1";
const RESEARCH_KEY = "ytrade-research";
const CALENDAR_KEY = "market-knowledge-calendar-v1";
const NEWS_TRANSLATION_KEY = "market-knowledge-news-title-translations-v1";
const FINNHUB_KEY = "market-knowledge-finnhub-key";

const RESEARCH_STATUSES = ["All", "Watching", "Researching", "Ready to Buy", "Hold", "Avoid"];

const RESEARCH_SECTIONS = [
  {
    id: "basicInfo",
    title: "1. 公司基本信息",
    subtitle: "Company basic information",
    fields: [
      ["ticker", "Ticker"],
      ["companyName", "Company name"],
      ["sector", "Sector"],
      ["industry", "Industry"],
      ["marketCap", "Market cap"],
    ],
  },
  {
    id: "business",
    title: "2. 商业模式",
    subtitle: "Business model",
    fields: [
      ["howItMakesMoney", "How it makes money"],
      ["keyProducts", "Key products"],
      ["mainCustomers", "Main customers"],
      ["moat", "Moat"],
    ],
  },
  {
    id: "growth",
    title: "3. 增长驱动",
    subtitle: "Growth drivers",
    fields: [
      ["nearTerm", "Near-term drivers"],
      ["longTerm", "Long-term drivers"],
    ],
  },
  {
    id: "financial",
    title: "4. 财务质量",
    subtitle: "Financial quality",
    fields: [
      ["revenueTrend", "Revenue trend"],
      ["marginTrend", "Margin trend"],
      ["freeCashFlow", "Free cash flow"],
      ["debt", "Debt"],
      ["dilutionBuybacks", "Dilution / buybacks"],
    ],
  },
  {
    id: "valuation",
    title: "5. 估值",
    subtitle: "Valuation",
    fields: [
      ["currentMultiple", "Current multiple"],
      ["peerComparison", "Peer comparison"],
      ["historicalRange", "Historical range"],
      ["cheapFairExpensive", "Cheap / fair / expensive"],
    ],
  },
  {
    id: "expectations",
    title: "6. 市场预期",
    subtitle: "Market expectations",
    fields: [
      ["pricedIn", "What is priced in"],
      ["beatScenario", "Beat scenario"],
      ["disappointScenario", "Disappoint scenario"],
    ],
  },
  {
    id: "risks",
    title: "7. 风险",
    subtitle: "Risks",
    fields: [
      ["companySpecific", "Company-specific risk"],
      ["industry", "Industry risk"],
      ["valuation", "Valuation risk"],
      ["execution", "Execution risk"],
    ],
  },
  {
    id: "tradingPlan",
    title: "8. 交易计划",
    subtitle: "Trading plan",
    fields: [
      ["whyNowOrWait", "Why now / why wait"],
      ["targetEntryZone", "Target entry zone"],
      ["invalidationCondition", "Invalidation condition"],
      ["timeHorizon", "Time horizon"],
      ["starterPositionSize", "Starter position size"],
      ["addTrimRules", "Add / trim rules"],
    ],
  },
  {
    id: "finalSummary",
    title: "9. 最终结论",
    subtitle: "Final conclusion",
    fields: [
      ["bullCase", "Bull case"],
      ["bearCase", "Bear case"],
      ["baseCase", "Base case"],
      ["conclusion", "Conclusion"],
    ],
  },
];

const STARTER_RESEARCH = [
  researchRecord({
    id: "mock-nvda-001",
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    sector: "Technology",
    industry: "Semiconductors",
    marketCap: "~$2.7T",
    status: "Ready to Buy",
    convictionScore: 8,
    updatedAt: "2026-05-20T14:30:00.000Z",
    business: {
      howItMakesMoney: "NVIDIA sells GPUs, networking, systems, and software platforms. Data Center is the main engine, driven by AI training and inference demand from hyperscalers, cloud providers, enterprises, and sovereign AI buyers.",
      keyProducts: "H100/H200, Blackwell B100/B200, GB200 NVL systems, NVLink, InfiniBand/Ethernet networking, CUDA, TensorRT, NIM, and RTX gaming/workstation GPUs.",
      mainCustomers: "Microsoft, Meta, Amazon, Google, Oracle, sovereign AI projects, OEMs, cloud customers, workstation users, and PC gamers.",
      moat: "CUDA developer lock-in, full-stack hardware/software integration, networking scale, ecosystem depth, and a multi-generation product cadence that competitors struggle to match.",
    },
    growth: {
      nearTerm: "Blackwell ramp, constrained supply, networking attach, sovereign AI capex, and hyperscaler cluster build-outs.",
      longTerm: "Inference workloads, enterprise AI adoption, software subscriptions, robotics, autonomous vehicles, and data-center platform expansion.",
    },
    financial: {
      revenueTrend: "Revenue growth remains dominated by Data Center. Growth will decelerate from extreme AI-boom rates, but demand visibility is still unusually strong.",
      marginTrend: "Gross margin is structurally high because NVIDIA captures system-level value, not only chip value. Watch Blackwell ramp costs and pricing pressure.",
      freeCashFlow: "Very high free-cash-flow conversion, with a strong cash balance and limited balance-sheet stress.",
      debt: "Low leverage relative to earnings power and cash flow.",
      dilutionBuybacks: "Buybacks help offset stock compensation; watch whether SBC expands faster than revenue quality.",
    },
    valuation: {
      currentMultiple: "Premium multiple, but less extreme when compared with growth, margin, and market share durability.",
      peerComparison: "Trades above AMD, AVGO, and legacy semis because it has stronger AI accelerator share, margins, and software ecosystem.",
      historicalRange: "Pre-AI NVDA often traded at 20-35x forward earnings; AI leadership expanded the acceptable range.",
      cheapFairExpensive: "Fair to slightly attractive if you believe AI capex has multi-year durability; expensive if growth normalizes quickly.",
    },
    expectations: {
      pricedIn: "Continued Data Center strength, Blackwell execution, no major hyperscaler capex pause, and sustained high margins.",
      beatScenario: "Sovereign AI accelerates, inference demand surprises, networking grows faster, software revenue starts to matter.",
      disappointScenario: "Export controls expand, Blackwell delays appear, hyperscalers enter a digestion phase, or AMD gains meaningful share.",
    },
    risks: {
      companySpecific: "Customer concentration, export restrictions, supply-chain dependence, and product-cycle execution.",
      industry: "Semiconductor cyclicality, AI ROI questions, and capex digestion risk.",
      valuation: "Multiple compression can be severe if growth decelerates faster than expected.",
      execution: "Rack-scale Blackwell systems are complex; any thermal, power, or delivery issue can reset expectations.",
    },
    tradingPlan: {
      whyNowOrWait: "Starter position is reasonable on pullbacks if thesis remains intact; avoid chasing after sharp multiple expansion.",
      targetEntryZone: "Prefer staged entries after broad market weakness or temporary AI-capex fear.",
      invalidationCondition: "Two quarters of Data Center revenue decline, structural margin break below expectations, or credible GPU share loss.",
      timeHorizon: "18-36 months.",
      starterPositionSize: "Small starter, then add only when thesis and valuation both improve.",
      addTrimRules: "Add on thesis-confirming pullbacks; trim if valuation expands without estimate upgrades.",
    },
    finalSummary: {
      bullCase: "AI accelerator demand stays supply-constrained, NVIDIA keeps platform dominance, and software improves revenue quality.",
      bearCase: "Capex digestion, export controls, competition, or multiple compression drive a large drawdown.",
      baseCase: "High-quality compounder with above-market growth, but position sizing must respect valuation risk.",
      conclusion: "Best-in-class AI infrastructure company. Suitable for a planned, staged position rather than emotional chasing.",
    },
    followUp: {
      watchItems: "Data Center revenue, gross margin, Blackwell delivery, hyperscaler capex commentary, export-control headlines, AMD share evidence.",
      nextReview: "Review after each earnings report and after major AI capex updates from MSFT, META, AMZN, GOOGL, and ORCL.",
    },
  }),
  researchRecord({
    id: "mock-brkb-002",
    ticker: "BRK.B",
    companyName: "Berkshire Hathaway Inc.",
    sector: "Financials",
    industry: "Diversified Insurance / Conglomerate",
    marketCap: "~$1.05T",
    status: "Watching",
    convictionScore: 6,
    updatedAt: "2026-05-22T09:15:00.000Z",
    business: {
      howItMakesMoney: "Berkshire earns from insurance underwriting and float investment, BNSF railroad, Berkshire Hathaway Energy, manufacturing, services, retail, and a large public-equity portfolio.",
      keyProducts: "GEICO, Gen Re, BHRG, BNSF, BHE utilities, Precision Castparts, Lubrizol, Marmon, McLane, Pilot/Flying J, and equity holdings.",
      mainCustomers: "Insurance customers, freight shippers, utility customers, industrial buyers, retail customers, and shareholders relying on capital allocation.",
      moat: "Low-cost insurance float, fortress balance sheet, decentralized operating culture, advantaged deal flow, and patient capital allocation.",
    },
    growth: {
      nearTerm: "GEICO profitability, insurance pricing, high short-rate investment income, and possible buybacks.",
      longTerm: "Capital deployment of the cash pile, private acquisitions, energy investments, and steady compounding in operating subsidiaries.",
    },
    financial: {
      revenueTrend: "Operating earnings compound steadily, but growth is slower than high-growth tech. Insurance and investment income are key drivers.",
      marginTrend: "GEICO margin recovery matters; BNSF and BHE are steadier but can face volume and regulatory pressure.",
      freeCashFlow: "Excellent cash generation and unusually large liquidity reserve.",
      debt: "Holding-company leverage is conservative; subsidiary debt is generally manageable.",
      dilutionBuybacks: "Buybacks are opportunistic, especially when price-to-book is attractive.",
    },
    valuation: {
      currentMultiple: "Often viewed through P/B, operating earnings multiple, and look-through earnings.",
      peerComparison: "Less comparable to single-line insurers or industrials because Berkshire is a capital-allocation platform.",
      historicalRange: "Usually attractive when close to 1.2-1.3x book; less compelling as it approaches the high end of its historical range.",
      cheapFairExpensive: "Fair, but not obviously cheap without a better entry or a large acquisition catalyst.",
    },
    expectations: {
      pricedIn: "Steady operating earnings, strong balance sheet, and continued investment income.",
      beatScenario: "Large acquisition, stronger GEICO profitability, buybacks at attractive valuation, or equity portfolio strength.",
      disappointScenario: "BHE liability surprise, weaker insurance cycle, poor capital deployment, or major equity-market drawdown.",
    },
    risks: {
      companySpecific: "Succession risk and BHE wildfire/regulatory exposure.",
      industry: "Insurance cycle softening and railroad volume pressure.",
      valuation: "Limited upside if bought at a premium to historical book range.",
      execution: "The cash pile can become a drag if attractive large deals are unavailable.",
    },
    tradingPlan: {
      whyNowOrWait: "Watchlist name; wait for a better entry unless seeking defensive exposure.",
      targetEntryZone: "More attractive near 1.3-1.4x book or during broad market weakness.",
      invalidationCondition: "Unexpected severe BHE liabilities, GEICO deterioration, or poor post-Buffett capital allocation.",
      timeHorizon: "3-5 years.",
      starterPositionSize: "Small defensive starter only at attractive valuation.",
      addTrimRules: "Add below intrinsic-value estimate; trim if valuation stretches without better earnings power.",
    },
    finalSummary: {
      bullCase: "Cash is deployed well, insurance remains strong, and operating businesses compound steadily.",
      bearCase: "Large liability shock, weak capital deployment, and equity portfolio drawdown compress value.",
      baseCase: "Reliable defensive compounder, but entry price matters.",
      conclusion: "High-quality watchlist stock. I want a better margin of safety before making it a major position.",
    },
    followUp: {
      watchItems: "Cash balance, buybacks, GEICO combined ratio, BHE liabilities, acquisition activity, and P/B range.",
      nextReview: "Review after quarterly operating earnings and annual shareholder letter.",
    },
  }),
];

const STARTER_FOCUS = [
  focusName("MU", "high", "active", "Memory cycle and AI server demand; watch DRAM/NAND pricing and capex discipline."),
  focusName("TSM", "high", "watching", "AI semiconductor foundry leader; watch monthly revenue, gross margin, and capex guidance."),
  focusName("NVDA", "high", "watching", "AI accelerator demand and platform ecosystem; watch data center growth and margin sustainability."),
  focusName("NBIS", "medium", "active", "AI infrastructure story; watch financing needs, utilization, and customer concentration."),
  focusName("AAOI", "medium", "waiting", "Optical networking beta; watch datacenter orders, margin trend, and dilution risk."),
];

const STARTER_EVENTS = [
  calendarEvent("SpaceX", "watching", "funding", "high", "", "Private market valuation, Starship milestones, Starlink growth, and possible IPO path can influence space, satellite, defense, and private-market sentiment.", "Track Starship launch cadence, Starlink revenue hints, and any formal listing comments."),
  calendarEvent("OpenAI", "watching", "funding", "high", "", "Funding rounds, model releases, and infrastructure spending can affect AI supply chain names, cloud capex expectations, and software competition.", "Watch model launch cadence, enterprise traction, compute partners, and valuation signals."),
  calendarEvent("Claude / Anthropic listing", "rumor", "ipo", "high", "", "A future Anthropic listing would be an AI benchmark event. It could reset valuation comps for foundation model companies and related cloud/semiconductor names.", "Treat as unconfirmed; collect credible sources and compare against OpenAI/private AI valuation multiples."),
];

const ENRICHED_TOPICS = {
  "zero-dte": {
    definition: "0DTE options are option contracts that expire on the same trading day. The defining feature is not simply short maturity, but extremely fast theta decay and highly sensitive gamma near the strike.",
    formula: [
      "DTE = trading time remaining / trading days in a year",
      "Call intrinsic value = max(S - K, 0)",
      "Put intrinsic value = max(K - S, 0)",
      "Breakeven for long call = K + premium",
      "Breakeven for long put = K - premium",
    ],
    example: "SPY is 500. You buy a 0DTE 502 call for 1.20. Breakeven is 503.20. If SPY closes at 504, profit is 504 - 502 - 1.20 = 0.80 per share, or $80 per contract before fees.",
    application: ["Intraday directional trade around known catalysts", "Short-term hedge for event or index exposure", "Reading dealer hedging pressure around high open-interest strikes"],
    visual: "payoff",
  },
  "gamma-squeeze": {
    definition: "A gamma squeeze is a feedback loop where option dealer hedging can amplify stock movement. It is most relevant when short-dated option demand is concentrated and the underlying trades near key strikes.",
    formula: [
      "Delta hedge shares approx = option delta x contracts x 100",
      "Change in hedge shares approx = gamma x change in stock price x contracts x 100",
      "High gamma means delta changes quickly as spot moves",
    ],
    example: "If traders buy many short-dated calls, dealers may be short calls. To hedge positive customer call exposure, dealers buy shares. If the stock rises toward the strike, call delta rises, forcing more share buying.",
    application: ["Identify crowded strikes using volume and open interest", "Watch whether spot is moving toward high-gamma zones", "Treat it as a risk amplifier, not a guaranteed direction signal"],
    visual: "feedback",
  },
  "sell-put": {
    definition: "Selling a put means receiving premium in exchange for taking the obligation to buy the underlying at the strike if assigned. A cash-secured put is economically similar to placing a limit buy order and being paid for the obligation.",
    formula: [
      "Max profit = premium received",
      "Breakeven = strike - premium",
      "Approx max loss = strike - premium, if stock goes to zero",
      "Assignment cost basis = strike - premium",
    ],
    example: "You sell one MU 700 put for 25. If assigned, your effective stock cost is 675. If MU stays above 700 through expiration, the put expires worthless and you keep $2,500 before fees.",
    application: ["Enter a stock at a target price", "Harvest premium when willing to own the stock", "Wheel strategy entry leg"],
    visual: "sellPut",
  },
  "covered-call": {
    definition: "A covered call combines long stock with a short call. The premium reduces cost basis, but upside above the strike is capped because the stock may be called away.",
    formula: [
      "Max profit approx = strike - stock cost + premium",
      "Breakeven = stock cost - premium",
      "Upside is capped above the call strike",
    ],
    example: "You own 100 NVDA shares at 900 and sell a 950 call for 20. Breakeven is 880. Max profit before fees is 950 - 900 + 20 = 70 per share if called away.",
    application: ["Generate income on a stock you already own", "Reduce cost basis in sideways markets", "Define an exit price for part of a position"],
    visual: "coveredCall",
  },
  alpha: {
    definition: "Alpha is the return left over after adjusting for systematic risk exposures. In practice, alpha asks: did the strategy outperform after accounting for market beta and other factor risks?",
    formula: [
      "CAPM alpha: Rp - [Rf + beta x (Rm - Rf)]",
      "Regression form: Rp - Rf = alpha + beta x (Rm - Rf) + error",
      "Multi-factor alpha: residual return after factor exposures",
    ],
    example: "A portfolio returns 18%. The risk-free rate is 4%, market return is 12%, and portfolio beta is 1.2. Expected return = 4% + 1.2 x 8% = 13.6%. Alpha = 18% - 13.6% = 4.4%.",
    application: ["Separate skill from market exposure", "Evaluate whether outperformance came from factor tilts", "Compare managers or strategies after risk adjustment"],
    visual: "regression",
  },
  beta: {
    definition: "Beta measures sensitivity to a benchmark. A beta of 1.5 means the asset has historically moved about 1.5% for a 1% benchmark move, though beta is unstable across regimes.",
    formula: [
      "Beta = Cov(asset return, market return) / Var(market return)",
      "Portfolio beta = sum(position weight x position beta)",
      "Dollar beta approx = position value x beta",
    ],
    example: "If your portfolio is $10,000 and beta is 1.3, a 2% market drop implies an approximate 2.6% portfolio drop, or about $260, before idiosyncratic effects.",
    application: ["Estimate portfolio market exposure", "Size hedges with SPY/QQQ or futures", "Avoid confusing high stock count with true diversification"],
    visual: "regression",
  },
  dcf: {
    definition: "Discounted cash flow values a business by discounting expected future free cash flows back to today. It makes growth, margin, reinvestment, terminal value, and discount-rate assumptions explicit.",
    formula: [
      "Enterprise value = sum(FCF_t / (1 + WACC)^t) + Terminal value / (1 + WACC)^n",
      "Terminal value, Gordon growth = FCF_(n+1) / (WACC - g)",
      "Equity value = Enterprise value - net debt",
      "Value per share = Equity value / diluted shares",
    ],
    example: "A company has FCF of $100, growing for 5 years, WACC of 9%, and terminal growth of 3%. Discount each yearly FCF, add discounted terminal value, subtract net debt, then divide by diluted shares.",
    application: ["Build bull/base/bear valuation scenarios", "Test whether the current price implies realistic growth", "Understand which assumptions drive most of the valuation"],
    visual: "dcf",
  },
  valuation: {
    definition: "Valuation multiples compare market price to a business metric such as earnings, sales, EBITDA, or free cash flow. They compress expectations about growth, quality, risk, and rates into one number.",
    formula: [
      "P/E = market price per share / EPS",
      "EV/Sales = enterprise value / revenue",
      "EV/EBITDA = enterprise value / EBITDA",
      "FCF yield = free cash flow / market cap",
    ],
    example: "If a stock trades at $120 and expected EPS is $6, forward P/E is 20x. If peers trade at 15x, the market is pricing higher growth, higher quality, lower risk, or overvaluation.",
    application: ["Compare firms with similar business models", "Track multiple expansion or compression", "Translate a thesis into implied growth expectations"],
    visual: "bars",
  },
  capm: {
    definition: "CAPM estimates required return from systematic market exposure. It is a baseline model for cost of equity and for separating beta-driven returns from alpha.",
    formula: [
      "Expected return = Rf + beta x (Rm - Rf)",
      "Equity risk premium = Rm - Rf",
      "Alpha = actual return - CAPM expected return",
    ],
    example: "If Rf is 4%, expected market return is 10%, and beta is 1.4, required return = 4% + 1.4 x 6% = 12.4%.",
    application: ["Estimate cost of equity", "Benchmark portfolio returns", "Think about whether return came from risk exposure or skill"],
    visual: "regression",
  },
  "black-scholes": {
    definition: "Black-Scholes-Merton is a continuous-time model for pricing European options. In practice it is most useful as a language for implied volatility and Greeks, not as a perfect description of reality.",
    formula: [
      "Call = S x N(d1) - K x e^(-rT) x N(d2)",
      "Put = K x e^(-rT) x N(-d2) - S x N(-d1)",
      "d1 = [ln(S/K) + (r + sigma^2/2)T] / [sigma sqrt(T)]",
      "d2 = d1 - sigma sqrt(T)",
    ],
    example: "Given spot, strike, time, rate, and volatility, BSM outputs a theoretical option price. Traders usually invert the model to infer implied volatility from the market price.",
    application: ["Translate option prices into implied volatility", "Compute Greeks", "Compare expensive vs cheap options across strikes and expirations"],
    visual: "payoff",
  },
  var: {
    definition: "Value at Risk estimates a loss threshold over a horizon at a confidence level. CVaR estimates the average loss after that threshold is breached.",
    formula: [
      "VaR_95 = loss level exceeded in the worst 5% of cases",
      "Parametric VaR = z x portfolio volatility x portfolio value",
      "CVaR = average(loss | loss exceeds VaR)",
    ],
    example: "A $100,000 portfolio with daily volatility of 2% has approximate 95% one-day VaR of 1.65 x 2% x 100,000 = $3,300, assuming normal returns.",
    application: ["Set portfolio risk budget", "Compare tail risk across strategies", "Stress-test options and leveraged positions"],
    visual: "distribution",
  },
};

const FORMULA_LIBRARY = {
  delta: ["Delta = change in option price / change in underlying price", "Approx stock-equivalent shares = delta x contracts x 100"],
  gamma: ["Gamma = change in delta / change in underlying price", "High gamma means hedge ratio changes quickly"],
  vega: ["Vega = change in option price for 1 vol point change in IV", "Long options are usually long vega"],
  theta: ["Theta = change in option value as time passes", "Daily decay approx = theta / trading day"],
  "implied-volatility": ["Option market price -> solve BSM for sigma", "Implied move approx = stock price x IV x sqrt(DTE / 365)"],
  "realized-volatility": ["Realized vol = stdev(daily returns) x sqrt(252)", "Return_t = ln(P_t / P_(t-1))"],
  "iv-rank": ["IV Rank = (current IV - IV low) / (IV high - IV low)", "IV Percentile = days with lower IV / total days"],
  "vol-skew": ["Skew = IV_put_OTM - IV_call_OTM", "Smile compares IV across strikes"],
  "portfolio-beta": ["Portfolio beta = sum(weight_i x beta_i)", "Dollar beta = market value x beta"],
  "risk-reward": ["Expected value = win probability x average win - loss probability x average loss", "Risk/reward = potential profit / potential loss"],
  "position-sizing": ["Position size = max dollar risk / risk per share", "Weight = position value / portfolio value"],
  margin: ["Leverage = gross exposure / equity", "Margin cushion = equity - maintenance requirement"],
  drawdown: ["Drawdown = current value / prior peak - 1", "Recovery needed = loss / (1 - loss)"],
  "tail-risk": ["Tail loss = loss beyond chosen percentile", "Expected shortfall = average tail loss"],
  "buy-call": ["Max loss = premium", "Breakeven = strike + premium", "Profit at expiry = max(S - K, 0) - premium"],
  "buy-put": ["Max loss = premium", "Breakeven = strike - premium", "Profit at expiry = max(K - S, 0) - premium"],
  "vertical-spread": ["Max profit = spread width - net debit, for debit spread", "Max loss = net debit", "Credit spread max loss = spread width - credit"],
  straddle: ["Long straddle cost = call premium + put premium", "Upper breakeven = strike + total premium", "Lower breakeven = strike - total premium"],
  "iron-condor": ["Max profit = net credit", "Max loss = spread width - net credit", "Breakevens = short put strike - credit; short call strike + credit"],
  assignment: ["Assignment P/L depends on effective stock basis", "Short put basis = strike - premium", "Covered call sale price = strike + premium"],
  "factor-model": ["Return = alpha + beta_1 x factor_1 + ... + beta_n x factor_n + error", "Factor exposure = regression coefficient"],
  "fama-french": ["Excess return = alpha + beta_mkt x MKT + beta_smb x SMB + beta_hml x HML + error", "Five-factor model adds RMW and CMA"],
  garch: ["sigma_t^2 = omega + alpha x epsilon_(t-1)^2 + beta x sigma_(t-1)^2", "Volatility clusters when alpha + beta is high"],
  "monte-carlo": ["Estimated value = average(simulated payoffs discounted to present)", "Standard error decreases with sqrt(number of simulations)"],
  backtesting: ["Strategy return = position_t x asset return_t - costs", "Sharpe = average excess return / return volatility"],
  earnings: ["Surprise = reported metric - consensus estimate", "Earnings reaction = actual result vs expectations + guidance revision"],
  eps: ["EPS = net income / diluted shares", "Forward P/E = price / expected EPS"],
  buyback: ["Net buyback yield = net share repurchases / market cap", "Dilution = new shares issued / prior shares outstanding"],
  rates: ["Present value = future cash flow / (1 + r)^t", "Higher discount rate lowers long-duration asset value"],
  "yield-curve": ["Term spread = 10Y yield - 2Y yield", "Real yield = nominal yield - expected inflation"],
  "risk-premium": ["Risk premium = expected risky return - risk-free rate", "Credit spread = corporate yield - Treasury yield"],
  volume: ["Relative volume = current volume / average volume", "Dollar volume = price x volume"],
  "open-interest": ["OI change = new open contracts - closed contracts", "Notional option exposure approx = OI x 100 x underlying price"],
  "option-chain": ["Moneyness call = S / K", "Intrinsic value call = max(S - K, 0)", "Extrinsic value = option price - intrinsic value"],
  vwap: ["VWAP = sum(price x volume) / sum(volume)", "Execution slippage = execution price - benchmark price"],
  slippage: ["Slippage = actual execution price - expected price", "Round-trip cost approx = spread + commissions + market impact"],
  "moving-average": ["SMA_n = average(last n closing prices)", "EMA_t = alpha x price_t + (1 - alpha) x EMA_(t-1)"],
  "momentum-factor": ["Momentum return = price_t / price_(t-n) - 1", "Vol-adjusted momentum = return / realized volatility"],
  "value-factor": ["Value score can use earnings yield, book-to-market, FCF yield", "Earnings yield = EPS / price"],
  "size-factor": ["Size often measured by market cap", "Market cap = price x shares outstanding"],
};

function topic(id, title, english, category, difficulty, related, summary, mechanics, pitfalls) {
  return { id, title, english, category, difficulty, related, summary, mechanics, pitfalls };
}

function focusName(symbol, priority = "medium", status = "watching", thesis = "") {
  return {
    id: newId(symbol),
    symbol,
    priority,
    status,
    price: "",
    thesis,
    catalyst: "",
    risk: "",
    action: "",
  };
}

function researchRecord(record) {
  const info = record.basicInfo || {};
  return {
    createdAt: record.createdAt || record.updatedAt || new Date().toISOString(),
    updatedAt: record.updatedAt || new Date().toISOString(),
    status: record.status || "Watching",
    convictionScore: Number(record.convictionScore) || 5,
    basicInfo: {
      ticker: record.ticker || info.ticker || "",
      companyName: record.companyName || info.companyName || "",
      sector: record.sector || info.sector || "",
      industry: record.industry || info.industry || "",
      marketCap: record.marketCap || info.marketCap || "",
    },
    business: record.business || record.businessUnderstanding || {},
    growth: record.growth || record.growthDrivers || {},
    financial: record.financial || record.financialQuality || {},
    valuation: record.valuation || {},
    expectations: record.expectations || record.marketExpectations || {},
    risks: record.risks || {},
    tradingPlan: record.tradingPlan || {},
    finalSummary: record.finalSummary || {},
    followUp: record.followUp || {},
    id: record.id || newId("research"),
  };
}

function calendarEvent(title, status = "watching", type = "other", importance = "medium", date = "", impact = "", action = "") {
  return {
    id: newId("event"),
    date,
    title,
    type,
    importance,
    status,
    ticker: "",
    impact,
    source: "",
    action,
  };
}

function newId(prefix = "holding") {
  return globalThis.crypto?.randomUUID
    ? crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function categoryTopics(categoryId) {
  return TOPICS.filter((item) => item.category === categoryId);
}

function filteredTopics() {
  const query = state.search.trim().toLowerCase();
  let items = TOPICS;

  if (state.activeCategory !== "all") {
    items = items.filter((item) => item.category === state.activeCategory);
  }

  if (query) {
    items = items.filter((item) => {
      const haystack = [
        item.title,
        item.english,
        item.summary,
        categoryById[item.category].name,
        categoryById[item.category].zh,
        item.related.map((id) => topicById[id]?.title || id).join(" "),
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }

  return [...items].sort((a, b) => {
    if (state.sort === "difficulty") {
      return difficultyRank[a.difficulty] - difficultyRank[b.difficulty] || a.title.localeCompare(b.title, "zh-CN");
    }
    if (state.sort === "category") {
      return categoryById[a.category].name.localeCompare(categoryById[b.category].name) || a.title.localeCompare(b.title, "zh-CN");
    }
    return a.english.localeCompare(b.english);
  });
}

function renderCategoryNav() {
  const items = [{ id: "all", name: "All Topics", zh: "全部知识点", count: TOPICS.length }, ...CATEGORIES.map((category) => ({
    ...category,
    count: categoryTopics(category.id).length,
  }))];

  els.categoryNav.innerHTML = items.map((item) => `
    <button class="category-button ${state.activeCategory === item.id ? "active" : ""}" data-category="${item.id}" type="button">
      <span><strong>${item.name}</strong><small>${item.zh}</small></span>
      <span class="category-count">${item.count}</span>
    </button>
  `).join("");
}

function renderSummary() {
  els.categorySummary.innerHTML = CATEGORIES.map((category) => {
    const examples = categoryTopics(category.id).slice(0, 3).map((item) => item.english).join(" / ");
    return `
      <button class="summary-tile" data-category="${category.id}" type="button">
        <strong>${category.zh}</strong>
        <span>${examples}</span>
      </button>
    `;
  }).join("");
}

function renderTopicList() {
  const items = filteredTopics();
  els.topicCount.textContent = `${items.length} topics`;
  els.topicList.innerHTML = items.map((item) => `
    <button class="topic-item ${state.activeTopic === item.id ? "active" : ""}" data-topic="${item.id}" type="button">
      <span class="topic-title">${item.title}</span>
      <span class="topic-meta">${item.english} · ${categoryById[item.category].zh}</span>
      <span class="difficulty ${item.difficulty}">${item.difficulty}</span>
    </button>
  `).join("");
}

function renderDetail() {
  const item = topicById[state.activeTopic] || filteredTopics()[0] || TOPICS[0];
  if (!item) {
    els.topicDetail.innerHTML = `<div class="empty-state-inline">No topic found. Clear the search to return to the map.</div>`;
    return;
  }
  state.activeTopic = item.id;
  const category = categoryById[item.category];
  const related = item.related.map((id) => topicById[id]).filter(Boolean);

  els.topicDetail.innerHTML = `
    <div class="detail-head">
      <div>
        <p class="eyebrow">${category.name}</p>
        <h3>${item.title}</h3>
        <p class="english">${item.english}</p>
      </div>
      <span class="difficulty ${item.difficulty}">${item.difficulty}</span>
    </div>
    <p class="summary">${item.summary}</p>
    ${renderEnhancedDetail(item.id)}
    <div class="note-grid">
      <section>
        <h4>怎么理解</h4>
        <ul>${item.mechanics.map((text) => `<li>${text}</li>`).join("")}</ul>
      </section>
      <section>
        <h4>常见误区</h4>
        <ul>${item.pitfalls.map((text) => `<li>${text}</li>`).join("")}</ul>
      </section>
    </div>
    <section class="related-section">
      <h4>相关知识点</h4>
      <div class="related-tags">
        ${related.map((rel) => `<button data-topic="${rel.id}" type="button">${rel.title}<span>${rel.english}</span></button>`).join("")}
      </div>
    </section>
  `;
}

function renderEnhancedDetail(topicId) {
  const item = topicById[topicId];
  const detail = ENRICHED_TOPICS[topicId] || buildStructuredDetail(item);
  if (!detail) return "";

  return `
    <section class="enhanced-detail">
      <div class="enhanced-grid">
        <article class="enhanced-card definition-card">
          <h4>Definition / 定义</h4>
          <p>${detail.definition}</p>
        </article>
        <article class="enhanced-card formula-card">
          <h4>Formula / 公式</h4>
          <ul>${detail.formula.map((line) => `<li><code>${line}</code></li>`).join("")}</ul>
        </article>
      </div>
      <div class="enhanced-grid">
        <article class="enhanced-card">
          <h4>Example / 例子</h4>
          <p>${detail.example}</p>
        </article>
        <article class="enhanced-card">
          <h4>Application / 应用</h4>
          <ul>${detail.application.map((line) => `<li>${line}</li>`).join("")}</ul>
        </article>
      </div>
      <article class="enhanced-card visual-card">
        <h4>Visual / 图示</h4>
        ${renderTopicVisual(detail.visual)}
      </article>
    </section>
  `;
}

function buildStructuredDetail(item) {
  if (!item) return null;
  const formula = FORMULA_LIBRARY[item.id] || genericFormulaFor(item);
  return {
    definition: `${item.title} (${item.english}): ${item.summary}`,
    formula,
    example: genericExampleFor(item),
    application: item.mechanics,
    visual: visualFor(item),
  };
}

function genericFormulaFor(item) {
  if (item.category === "options" || item.category === "greeks") {
    return ["Payoff at expiry depends on spot price S, strike K, premium, and contract multiplier 100", "Breakeven, max loss, and max profit must be defined before entering the trade"];
  }
  if (item.category === "risk") {
    return ["Risk = position size x adverse price move", "Portfolio risk depends on weight, correlation, volatility, and liquidity"];
  }
  if (item.category === "fundamental") {
    return ["Value driver = growth x margin x reinvestment efficiency x valuation multiple", "Expected return approx = earnings growth + multiple change + shareholder yield"];
  }
  if (item.category === "macro") {
    return ["Asset value = future cash flows discounted by rates and risk premium", "Change in valuation approx = change in expected growth - change in discount rate"];
  }
  if (item.category === "data") {
    return ["Signal = current observation compared with historical baseline", "Relative measure = current value / historical average"];
  }
  if (item.category === "quant") {
    return ["Model output = assumptions + parameters + data + error term", "Always compare in-sample result with out-of-sample behavior"];
  }
  return ["No single canonical formula; define inputs, mechanism, measurable signal, and risk before using it", "Decision value = explanatory power x actionability - trading cost - model error"];
}

function genericExampleFor(item) {
  if (item.category === "options") {
    return `For ${item.english}, start with a real contract: ticker, expiration, strike, premium, and side. Then compute breakeven, max loss, and what happens if the underlying moves up, down, or stays flat.`;
  }
  if (item.category === "greeks") {
    return `For ${item.english}, change one variable such as spot, volatility, or time, then compare option prices. The larger the sensitivity, the more that risk factor dominates the position.`;
  }
  if (item.category === "fundamental") {
    return `For ${item.english}, build a base case and then change one assumption. If a small change in growth, margin, or discount rate flips the conclusion, the thesis is assumption-sensitive.`;
  }
  if (item.category === "risk") {
    return `For ${item.english}, apply it to a MU or NVDA position: if the stock moves 5% against you, how much do you lose, and does that fit your portfolio risk budget?`;
  }
  return `For ${item.english}, apply it to one real holding, define the observable input, compare it with a baseline, and decide whether it changes buy, sell, add, reduce, or wait.`;
}

function visualFor(item) {
  if (item.category === "options" || item.category === "greeks") return "payoff";
  if (item.category === "quant" || item.id.includes("beta") || item.id === "alpha") return "regression";
  if (item.category === "fundamental") return "bars";
  if (item.category === "risk") return "distribution";
  return "";
}

function renderTopicVisual(type) {
  if (type === "feedback") {
    return `
      <div class="feedback-visual">
        <span>Call buying</span>
        <span>Dealer short gamma</span>
        <span>Delta hedge buy shares</span>
        <span>Spot moves higher</span>
        <span>More hedging demand</span>
      </div>
    `;
  }

  if (type === "regression") {
    return `
      <svg class="concept-visual" viewBox="0 0 520 220" role="img" aria-label="Alpha beta regression diagram">
        <line class="chart-axis" x1="52" y1="176" x2="474" y2="176" />
        <line class="chart-axis" x1="52" y1="176" x2="52" y2="32" />
        <line class="chart-line blue" x1="72" y1="158" x2="444" y2="48" />
        <circle class="chart-dot" cx="120" cy="145" r="6" />
        <circle class="chart-dot" cx="196" cy="118" r="6" />
        <circle class="chart-dot" cx="282" cy="96" r="6" />
        <circle class="chart-dot rose" cx="364" cy="58" r="7" />
        <text x="78" y="28">Return</text>
        <text x="390" y="202">Market return</text>
        <text x="328" y="44">alpha residual</text>
        <text x="255" y="72">slope = beta</text>
      </svg>
    `;
  }

  if (type === "bars") {
    return `
      <svg class="concept-visual" viewBox="0 0 520 220" role="img" aria-label="Valuation driver bars">
        <line class="chart-axis" x1="52" y1="176" x2="474" y2="176" />
        <rect class="bar mint" x="82" y="112" width="58" height="64" />
        <rect class="bar blue" x="176" y="82" width="58" height="94" />
        <rect class="bar rose" x="270" y="58" width="58" height="118" />
        <rect class="bar amber" x="364" y="38" width="58" height="138" />
        <text x="72" y="198">Growth</text>
        <text x="168" y="198">Margin</text>
        <text x="252" y="198">Multiple</text>
        <text x="356" y="198">Value</text>
        <text x="62" y="34">Drivers compound into valuation</text>
      </svg>
    `;
  }

  if (type === "dcf") {
    return `
      <svg class="concept-visual" viewBox="0 0 520 220" role="img" aria-label="Discounted cash flow diagram">
        <line class="chart-axis" x1="52" y1="176" x2="474" y2="176" />
        <line class="chart-axis" x1="52" y1="176" x2="52" y2="32" />
        <rect class="bar mint" x="86" y="126" width="44" height="50" />
        <rect class="bar mint" x="150" y="112" width="44" height="64" />
        <rect class="bar mint" x="214" y="94" width="44" height="82" />
        <rect class="bar mint" x="278" y="78" width="44" height="98" />
        <rect class="bar rose" x="364" y="42" width="62" height="134" />
        <path class="chart-line blue" d="M108 126 L172 112 L236 94 L300 78 L395 42" />
        <text x="82" y="200">FCF1</text>
        <text x="148" y="200">FCF2</text>
        <text x="212" y="200">FCF3</text>
        <text x="278" y="200">FCF4</text>
        <text x="350" y="200">Terminal</text>
        <text x="70" y="34">discount each future cash flow</text>
      </svg>
    `;
  }

  if (type === "distribution") {
    return `
      <svg class="concept-visual" viewBox="0 0 520 220" role="img" aria-label="Risk distribution diagram">
        <line class="chart-axis" x1="52" y1="176" x2="474" y2="176" />
        <path class="distribution-fill" d="M60 176 C120 172 145 134 190 92 C235 48 290 48 334 92 C380 136 404 172 464 176 Z" />
        <path class="chart-line blue" d="M60 176 C120 172 145 134 190 92 C235 48 290 48 334 92 C380 136 404 172 464 176" />
        <rect class="tail-zone" x="60" y="128" width="72" height="48" />
        <text x="62" y="118">left tail</text>
        <text x="355" y="202">returns</text>
        <text x="190" y="34">Loss distribution</text>
      </svg>
    `;
  }

  const label = {
    payoff: "Long option payoff",
    sellPut: "Short put payoff",
    coveredCall: "Covered call payoff",
  }[type] || "Payoff";
  const path = type === "sellPut"
    ? "M 50 50 L 235 50 L 455 170"
    : type === "coveredCall"
      ? "M 50 170 L 260 70 L 455 70"
      : "M 50 170 L 250 170 L 455 50";

  return `
    <svg class="concept-visual" viewBox="0 0 520 220" role="img" aria-label="${label}">
      <line class="chart-axis" x1="50" y1="170" x2="470" y2="170" />
      <line class="chart-axis" x1="260" y1="28" x2="260" y2="190" />
      <line class="strike-line" x1="260" y1="34" x2="260" y2="184" />
      <path class="payoff-line visual-payoff" d="${path}" />
      <text x="58" y="202">Lower spot</text>
      <text x="378" y="202">Higher spot</text>
      <text x="272" y="42">strike</text>
      <text x="54" y="32">${label}</text>
    </svg>
  `;
}

function renderGraph() {
  const active = topicById[state.activeTopic] || TOPICS[0];
  if (!active) {
    els.graph.innerHTML = "";
    return;
  }
  const first = active.related.map((id) => topicById[id]).filter(Boolean);
  const second = first.flatMap((item) => item.related.map((id) => topicById[id]).filter(Boolean));
  const nodes = uniqueById([active, ...first, ...second]).slice(0, 24);
  const nodeIds = new Set(nodes.map((item) => item.id));
  const edges = [];

  nodes.forEach((item) => {
    item.related.forEach((id) => {
      if (nodeIds.has(id)) edges.push([item.id, id]);
    });
  });

  const positions = {};
  positions[active.id] = { x: 260, y: 260 };
  const orbit = nodes.filter((item) => item.id !== active.id);
  orbit.forEach((item, index) => {
    const radius = index < first.length ? 145 : 215;
    const angle = (Math.PI * 2 * index) / Math.max(orbit.length, 1) - Math.PI / 2;
    positions[item.id] = { x: 260 + Math.cos(angle) * radius, y: 260 + Math.sin(angle) * radius };
  });

  const edgeMarkup = edges.map(([from, to]) => {
    const a = positions[from];
    const b = positions[to];
    return `<line class="edge" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />`;
  }).join("");

  const nodeMarkup = nodes.map((item) => {
    const pos = positions[item.id];
    const isActive = item.id === active.id;
    return `
      <g class="graph-node ${isActive ? "active" : ""}" data-topic="${item.id}" transform="translate(${pos.x} ${pos.y})">
        <circle r="${isActive ? 18 : 11}" />
        <text y="${isActive ? -27 : -18}">${item.title}</text>
      </g>
    `;
  }).join("");

  els.graph.innerHTML = `<g>${edgeMarkup}${nodeMarkup}</g>`;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function renderPageTitle() {
  els.pageTitle.textContent = state.activeCategory === "all" ? "All Topics" : categoryById[state.activeCategory].zh;
}

function safeRun(label, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`${label} failed`, error);
  }
}

function render() {
  safeRun("renderPageTitle", renderPageTitle);
  safeRun("renderCategoryNav", renderCategoryNav);
  safeRun("renderSummary", renderSummary);
  safeRun("renderTopicList", renderTopicList);
  safeRun("renderDetail", renderDetail);
  safeRun("renderGraph", renderGraph);
}

function selectCategory(categoryId) {
  state.activeCategory = categoryId;
  const visible = filteredTopics();
  if (!visible.some((item) => item.id === state.activeTopic)) {
    state.activeTopic = visible[0]?.id || TOPICS[0].id;
  }
  render();
}

function selectTopic(topicId) {
  if (!topicById[topicId]) return;
  state.activeTopic = topicId;
  renderTopicList();
  renderDetail();
  renderGraph();
}

function setView(view) {
  state.view = view;
  els.viewTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  els.mapView.classList.toggle("hidden", view !== "map");
  els.labView.classList.toggle("hidden", view !== "lab");
  els.focusView.classList.toggle("hidden", view !== "focus");
  els.researchView.classList.toggle("hidden", view !== "research");
  els.calendarView.classList.toggle("hidden", view !== "calendar");
  els.newsView.classList.toggle("hidden", view !== "news");
  if (view === "lab") renderPayoff();
  if (view === "focus") renderFocus();
  if (view === "research") renderResearch();
  if (view === "calendar") renderCalendar();
  if (view === "news") renderNews();
}

function renderPayoff() {
  const strategy = els.strategySelect.value || "buyCall";
  const spot = Number(els.spotInput.value) || 100;
  const strike = Number(els.strikeInput.value) || 100;
  const premium = Number(els.premiumInput.value) || 0;
  const minPrice = Math.max(1, Math.floor(spot * 0.55));
  const maxPrice = Math.ceil(spot * 1.45);
  const points = [];

  for (let price = minPrice; price <= maxPrice; price += Math.max(1, Math.round((maxPrice - minPrice) / 36))) {
    points.push({ price, payoff: payoff(strategy, price, strike, premium, spot) });
  }

  const payoffs = points.map((point) => point.payoff);
  const yMin = Math.min(...payoffs, 0);
  const yMax = Math.max(...payoffs, 0);
  const xScale = (price) => 44 + ((price - minPrice) / (maxPrice - minPrice)) * 632;
  const yScale = (value) => 238 - ((value - yMin) / Math.max(yMax - yMin, 1)) * 196;
  const d = points.map((point, index) => `${index ? "L" : "M"} ${xScale(point.price).toFixed(1)} ${yScale(point.payoff).toFixed(1)}`).join(" ");
  const zeroY = yScale(0);
  const strikeX = xScale(strike);

  els.payoffStats.innerHTML = payoffStats(strategy, strike, premium, spot).map((stat) => `
    <div class="stat"><span>${stat.label}</span><strong>${stat.value}</strong></div>
  `).join("");

  els.payoffChart.innerHTML = `
    <line class="axis" x1="36" y1="${zeroY}" x2="684" y2="${zeroY}" />
    <line class="strike-line" x1="${strikeX}" y1="26" x2="${strikeX}" y2="246" />
    <path class="payoff-line" d="${d}" />
    <text x="44" y="268">${minPrice}</text>
    <text x="642" y="268">${maxPrice}</text>
    <text x="${Math.min(strikeX + 6, 620)}" y="24">strike ${strike}</text>
  `;
}

function payoff(strategy, price, strike, premium, spot) {
  if (strategy === "buyCall") return Math.max(price - strike, 0) - premium;
  if (strategy === "sellPut") return premium - Math.max(strike - price, 0);
  if (strategy === "coveredCall") return price - spot + premium - Math.max(price - strike, 0);
  if (strategy === "protectivePut") return price - spot - premium + Math.max(strike - price, 0);
  return 0;
}

function payoffStats(strategy, strike, premium, spot) {
  const unlimited = "uncapped";
  const labels = {
    buyCall: [
      ["Max Profit", unlimited],
      ["Max Loss", `-${fmt(premium)}`],
      ["Breakeven", fmt(strike + premium)],
    ],
    sellPut: [
      ["Max Profit", fmt(premium)],
      ["Max Loss", `-${fmt(strike - premium)}`],
      ["Breakeven", fmt(strike - premium)],
    ],
    coveredCall: [
      ["Max Profit", fmt(Math.max(strike - spot, 0) + premium)],
      ["Max Loss", `-${fmt(spot - premium)}`],
      ["Breakeven", fmt(spot - premium)],
    ],
    protectivePut: [
      ["Max Profit", unlimited],
      ["Max Loss", `-${fmt(Math.max(spot - strike, 0) + premium)}`],
      ["Breakeven", fmt(spot + premium)],
    ],
  };
  return labels[strategy].map(([label, value]) => ({ label, value }));
}

function fmt(value) {
  return Number(value).toFixed(2);
}

function money(value) {
  const number = Number(value) || 0;
  return number.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function loadFocus() {
  try {
    const saved = JSON.parse(localStorage.getItem(FOCUS_KEY) || "null");
    state.focusList = Array.isArray(saved?.items) && saved.items.length ? saved.items : STARTER_FOCUS;
  } catch {
    state.focusList = STARTER_FOCUS;
  }
  saveFocus();
}

function saveFocus() {
  localStorage.setItem(
    FOCUS_KEY,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), items: state.focusList }),
  );
}

function loadResearch() {
  try {
    const saved = JSON.parse(localStorage.getItem(RESEARCH_KEY) || "null");
    const items = Array.isArray(saved?.state?.items)
      ? saved.state.items
      : Array.isArray(saved?.items)
        ? saved.items
        : Array.isArray(saved)
          ? saved
          : [];
    state.researchItems = items.length ? items.map(researchRecord) : STARTER_RESEARCH;
  } catch {
    state.researchItems = STARTER_RESEARCH;
  }
  if (!state.activeResearchId) state.activeResearchId = state.researchItems[0]?.id || "";
  saveResearch();
}

function saveResearch() {
  localStorage.setItem(
    RESEARCH_KEY,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), state: { items: state.researchItems } }),
  );
}

function researchById(id) {
  return state.researchItems.find((item) => item.id === id);
}

function filteredResearch() {
  if (state.researchFilter === "All") return state.researchItems;
  return state.researchItems.filter((item) => item.status === state.researchFilter);
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function convictionClass(score) {
  if (score >= 8) return "high";
  if (score >= 5) return "medium";
  return "low";
}

function renderResearch() {
  renderResearchFilters();
  renderResearchStats();
  renderResearchCards();
  renderResearchDetail();
  renderResearchFormShell();
}

function renderResearchFilters() {
  const counts = state.researchItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, { All: state.researchItems.length });

  els.researchFilters.innerHTML = RESEARCH_STATUSES.map((status) => `
    <button class="research-filter ${state.researchFilter === status ? "active" : ""}" data-research-filter="${status}" type="button">
      <span>${status}</span>
      <strong>${counts[status] || 0}</strong>
    </button>
  `).join("");
}

function renderResearchStats() {
  const items = state.researchItems;
  const avg = items.length
    ? (items.reduce((sum, item) => sum + Number(item.convictionScore || 0), 0) / items.length).toFixed(1)
    : "0.0";
  const ready = items.filter((item) => item.status === "Ready to Buy").length;
  const researching = items.filter((item) => item.status === "Researching").length;
  els.researchStats.innerHTML = [
    ["Research Files", items.length],
    ["Avg Conviction", avg],
    ["Ready to Buy", ready],
    ["Researching", researching],
  ].map(([label, value]) => `<div class="portfolio-stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderResearchCards() {
  const items = filteredResearch();
  els.researchCount.textContent = `${items.length} shown`;

  if (!items.length) {
    els.researchCards.innerHTML = `<div class="empty-state-inline">No research with status "${state.researchFilter}".</div>`;
    return;
  }

  els.researchCards.innerHTML = items.map((item) => {
    const info = item.basicInfo;
    const conclusion = item.finalSummary?.conclusion || "No conclusion yet.";
    return `
      <button class="research-card ${state.activeResearchId === item.id ? "active" : ""}" data-research-id="${item.id}" type="button">
        <div class="research-card-top">
          <div>
            <strong>${info.ticker}</strong>
            <span>${info.companyName || "Unnamed company"}</span>
          </div>
          <span class="status-badge ${statusClass(item.status)}">${item.status}</span>
        </div>
        <div class="research-card-meta">
          <span>${info.sector || "Sector TBD"}</span>
          <span class="conviction ${convictionClass(item.convictionScore)}">${item.convictionScore}/10</span>
        </div>
        <p>${conclusion}</p>
      </button>
    `;
  }).join("");
}

function renderResearchDetail() {
  const item = researchById(state.activeResearchId) || filteredResearch()[0] || state.researchItems[0];
  if (!item) {
    els.researchUpdated.textContent = "";
    els.researchDetail.innerHTML = `<div class="empty-state-inline">Start a new research file to use the 9-section template.</div>`;
    return;
  }
  state.activeResearchId = item.id;
  const info = item.basicInfo;
  els.researchUpdated.textContent = `Updated ${formatShortDate(item.updatedAt)}`;
  els.researchDetail.innerHTML = `
    <div class="research-detail-head">
      <div>
        <p class="eyebrow">${info.sector || "Research"}</p>
        <h3>${info.ticker} · ${info.companyName || "Company"}</h3>
        <p>${info.industry || ""}${info.marketCap ? ` · ${info.marketCap}` : ""}</p>
      </div>
      <div class="research-detail-badges">
        <span class="status-badge ${statusClass(item.status)}">${item.status}</span>
        <span class="conviction ${convictionClass(item.convictionScore)}">${item.convictionScore}/10 conviction</span>
      </div>
    </div>
    <div class="research-section-list">
      ${RESEARCH_SECTIONS.map((section) => renderResearchSection(item, section)).join("")}
    </div>
    <div class="research-detail-actions">
      <button class="mini-btn" data-edit-research="${item.id}" type="button">Edit</button>
      <button class="mini-btn danger" data-delete-research="${item.id}" type="button">Delete</button>
    </div>
  `;
}

function renderResearchSection(item, section) {
  const data = item[section.id] || {};
  return `
    <section class="research-section-card">
      <h4>${section.title}<span>${section.subtitle}</span></h4>
      <div class="research-field-grid">
        ${section.fields.map(([key, label]) => `
          <div>
            <strong>${label}</strong>
            <p>${data[key] || "TBD"}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderResearchFormShell() {
  if (els.researchSectionFields.dataset.ready === "true") return;
  els.researchSectionFields.innerHTML = RESEARCH_SECTIONS.filter((section) => section.id !== "basicInfo").map((section) => `
    <fieldset class="research-form-section">
      <legend>${section.title}<span>${section.subtitle}</span></legend>
      ${section.fields.map(([key, label]) => `
        <label>
          <span>${label}</span>
          <textarea data-research-section="${section.id}" data-research-field="${key}" rows="3"></textarea>
        </label>
      `).join("")}
    </fieldset>
  `).join("");
  els.researchSectionFields.dataset.ready = "true";
  updateConvictionLabel();
}

function clearResearchForm() {
  els.researchForm.reset();
  els.researchId.value = "";
  els.researchConviction.value = "5";
  updateConvictionLabel();
  els.researchSectionFields.querySelectorAll("textarea").forEach((field) => {
    field.value = "";
  });
}

function fillResearchForm(item) {
  renderResearchFormShell();
  els.researchId.value = item.id;
  els.researchTicker.value = item.basicInfo.ticker || "";
  els.researchCompany.value = item.basicInfo.companyName || "";
  els.researchStatus.value = item.status || "Watching";
  els.researchConviction.value = item.convictionScore || 5;
  els.researchSector.value = item.basicInfo.sector || "";
  els.researchIndustry.value = item.basicInfo.industry || "";
  els.researchMarketCap.value = item.basicInfo.marketCap || "";
  els.researchSectionFields.querySelectorAll("textarea").forEach((field) => {
    field.value = item[field.dataset.researchSection]?.[field.dataset.researchField] || "";
  });
  updateConvictionLabel();
  els.researchTicker.focus();
}

function formResearch() {
  const now = new Date().toISOString();
  const id = els.researchId.value || newId("research");
  const existing = researchById(id);
  const record = researchRecord({
    id,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    ticker: els.researchTicker.value.trim().toUpperCase(),
    companyName: els.researchCompany.value.trim(),
    sector: els.researchSector.value.trim(),
    industry: els.researchIndustry.value.trim(),
    marketCap: els.researchMarketCap.value.trim(),
    status: els.researchStatus.value,
    convictionScore: Number(els.researchConviction.value),
  });
  els.researchSectionFields.querySelectorAll("textarea").forEach((field) => {
    const section = field.dataset.researchSection;
    const key = field.dataset.researchField;
    record[section][key] = field.value.trim();
  });
  return record;
}

function updateConvictionLabel() {
  els.researchConvictionValue.textContent = `${els.researchConviction.value} / 10`;
}

function formatShortDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function exportResearch() {
  downloadJson("market-knowledge-research.json", {
    version: 1,
    exportedAt: new Date().toISOString(),
    items: state.researchItems,
  });
}

function importResearch(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      if (!items.length) throw new Error("No research items");
      state.researchItems = items.map(researchRecord);
      state.activeResearchId = state.researchItems[0]?.id || "";
      saveResearch();
      renderResearch();
    } catch {
      window.alert("Could not import this research file.");
    }
  };
  reader.readAsText(file);
}

function loadCalendar() {
  try {
    const saved = JSON.parse(localStorage.getItem(CALENDAR_KEY) || "null");
    state.calendar = Array.isArray(saved?.events) && saved.events.length ? saved.events : STARTER_EVENTS;
  } catch {
    state.calendar = STARTER_EVENTS;
  }
  saveCalendar();
}

function saveCalendar() {
  localStorage.setItem(
    CALENDAR_KEY,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), events: state.calendar }),
  );
}

function loadFinnhubKey() {
  els.finnhubKeyInput.value = localStorage.getItem(FINNHUB_KEY) || "";
}

function saveFinnhubKey() {
  const key = els.finnhubKeyInput.value.trim();
  if (key) {
    localStorage.setItem(FINNHUB_KEY, key);
    window.alert("Finnhub key saved in this browser.");
  } else {
    localStorage.removeItem(FINNHUB_KEY);
    window.alert("Finnhub key removed.");
  }
}

async function fetchQuotes(symbols, key) {
  const unique = [...new Set(symbols.map((symbol) => symbol.trim().toUpperCase()).filter(Boolean))];
  const quotes = await Promise.all(unique.map(async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(key)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Quote failed for ${symbol}`);
    const data = await response.json();
    return [symbol, data];
  }));
  return Object.fromEntries(quotes);
}

function yyyyMmDd(date) {
  return date.toISOString().slice(0, 10);
}

function myTickerUniverse() {
  const focusSymbols = state.focusList.map((item) => item.symbol);
  const eventSymbols = state.calendar.map((item) => item.ticker);
  return [...new Set([...focusSymbols, ...eventSymbols]
    .join(",")
    .split(/[\s,;]+/)
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean))];
}

function setDefaultNewsTickers() {
  els.newsTickers.value = myTickerUniverse().join(", ");
}

function loadTranslationCache() {
  try {
    const saved = JSON.parse(localStorage.getItem(NEWS_TRANSLATION_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveTranslationCache(cache) {
  localStorage.setItem(NEWS_TRANSLATION_KEY, JSON.stringify(cache));
}

async function fetchCompanyNews(symbol, key, from, to) {
  const url = `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&from=${from}&to=${to}&token=${encodeURIComponent(key)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`News failed for ${symbol}`);
  const data = await response.json();
  return Array.isArray(data) ? data.map((item) => ({ ...item, querySymbol: symbol })) : [];
}

async function translateTitleToChinese(title) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(title)}&langpair=en|zh-CN`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Translation request failed");
  const data = await response.json();
  return data?.responseData?.translatedText || "";
}

async function translateNewsTitles() {
  const visible = state.news.filter((item) => item.headline).slice(0, 40);
  if (!visible.length) {
    window.alert("Fetch news first, then translate titles.");
    return;
  }

  const cache = loadTranslationCache();
  els.translateNewsBtn.disabled = true;
  els.translateNewsBtn.textContent = "Translating...";

  try {
    for (const item of visible) {
      const headline = item.headline.trim();
      if (!headline || cache[headline]) continue;
      const translated = await translateTitleToChinese(headline);
      if (translated && translated.toLowerCase() !== headline.toLowerCase()) {
        cache[headline] = translated;
      }
    }
    saveTranslationCache(cache);
    state.news = state.news.map((item) => ({
      ...item,
      translatedHeadline: item.headline ? cache[item.headline.trim()] || item.translatedHeadline || "" : "",
    }));
    renderNews();
  } catch (error) {
    window.alert(`Translation failed: ${error.message}`);
  } finally {
    els.translateNewsBtn.disabled = false;
    els.translateNewsBtn.textContent = "Translate Titles";
  }
}

async function refreshNews() {
  const key = (els.finnhubKeyInput.value.trim() || localStorage.getItem(FINNHUB_KEY) || "").trim();
  if (!key) {
    window.alert("Paste a Finnhub API key in News first, then click Save Key.");
    return;
  }

  const symbols = [...new Set(els.newsTickers.value
    .split(/[\s,;]+/)
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean))];
  if (!symbols.length) {
    window.alert("Enter at least one ticker, or click Use My Tickers.");
    return;
  }

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - (Number(els.newsLookback.value) || 7));
  const from = yyyyMmDd(fromDate);
  const to = yyyyMmDd(toDate);

  els.refreshNewsBtn.disabled = true;
  els.refreshNewsBtn.textContent = "Fetching...";

  try {
    const batches = await Promise.all(symbols.map((symbol) => fetchCompanyNews(symbol, key, from, to)));
    const cache = loadTranslationCache();
    state.news = batches.flat()
      .filter((item) => item.headline || item.summary)
      .map((item) => ({
        ...item,
        translatedHeadline: item.headline ? cache[item.headline.trim()] || "" : "",
      }))
      .sort((a, b) => Number(b.datetime || 0) - Number(a.datetime || 0))
      .slice(0, 120);
    renderNews();
  } catch (error) {
    window.alert(`News fetch failed: ${error.message}`);
  } finally {
    els.refreshNewsBtn.disabled = false;
    els.refreshNewsBtn.textContent = "Fetch News";
  }
}

async function renderFocus() {
  if (!state.focusList.length) {
    state.focusList = STARTER_FOCUS;
    saveFocus();
  }

  const high = state.focusList.filter((item) => item.priority === "high").length;
  const active = state.focusList.filter((item) => item.status === "active").length;
  const priced = state.focusList.filter((item) => item.price).length;
  const updated = state.focusList
    .map((item) => item.lastUpdated)
    .filter(Boolean)
    .sort()
    .pop();

  els.focusStats.innerHTML = [
    ["Focus Names", String(state.focusList.length)],
    ["High Priority", String(high)],
    ["Active Research", String(active)],
    ["Priced", String(priced)],
  ].map(([label, value]) => `
    <div class="portfolio-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  els.focusCount.textContent = updated ? `Updated ${new Date(updated).toLocaleString()}` : `${state.focusList.length} tracked`;
  els.focusList.innerHTML = state.focusList.map((item) => {
    const related = [
      { label: "Why stocks move", topicId: "stock-price" },
      { label: "Earnings", topicId: "earnings" },
      { label: "Valuation", topicId: "valuation" },
      { label: "Risk sizing", topicId: "position-sizing" },
    ];
    return `
      <article class="focus-card priority-${escapeHtml(item.priority || "medium")}">
        <div class="holding-top">
          <div>
            <strong>${escapeHtml(item.symbol || "NEW")}</strong>
            <span>${labelForFocusStatus(item.status)} · ${labelForPriority(item.priority)}</span>
          </div>
          <div class="holding-actions">
            <button type="button" data-edit-focus="${item.id}">Edit</button>
            <button type="button" data-delete-focus="${item.id}">Delete</button>
          </div>
        </div>
        <div class="focus-meta">
          <span>Price <strong>${item.price ? money(item.price) : "-"}</strong></span>
          <span>Move <strong class="${pnlClass(Number(item.lastChange) || 0)}">${item.lastUpdated ? changeText(item) : "-"}</strong></span>
          <span>Status <strong>${labelForFocusStatus(item.status)}</strong></span>
        </div>
        ${focusSection("Thesis", item.thesis)}
        ${focusSection("Catalyst", item.catalyst)}
        ${focusSection("Risk", item.risk)}
        ${focusSection("Next Action", item.action)}
        <div class="holding-tags">${related.map((topic) => `<button type="button" data-topic-link="${topic.topicId}">${topic.label}</button>`).join("")}</div>
      </article>
    `;
  }).join("");
}

function focusSection(label, value) {
  return value ? `<p class="focus-note"><span>${label}</span>${escapeHtml(value)}</p>` : "";
}

function labelForPriority(priority) {
  return { high: "High priority", medium: "Medium priority", low: "Low priority" }[priority] || "Medium priority";
}

function labelForFocusStatus(status) {
  return {
    watching: "Watching",
    waiting: "Waiting for setup",
    active: "Active research",
    avoid: "Avoid / too risky",
  }[status] || "Watching";
}

function renderCalendar() {
  if (!state.calendar.length) {
    state.calendar = STARTER_EVENTS;
    saveCalendar();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sorted = [...state.calendar].sort((a, b) => eventSortValue(a) - eventSortValue(b));
  const dated = sorted.filter((event) => event.date);
  const upcoming = dated.filter((event) => new Date(`${event.date}T00:00:00`) >= today).length;
  const high = sorted.filter((event) => event.importance === "high").length;
  const rumors = sorted.filter((event) => event.status === "rumor").length;

  els.calendarStats.innerHTML = [
    ["Events", String(sorted.length)],
    ["Upcoming", String(upcoming)],
    ["High Importance", String(high)],
    ["Rumor / Unconfirmed", String(rumors)],
  ].map(([label, value]) => `
    <div class="portfolio-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  els.calendarCount.textContent = dated.length ? `${dated.length} dated` : `${sorted.length} tracked`;
  els.calendarList.innerHTML = sorted.map((event) => {
    const related = [
      { label: "Stock reaction", topicId: "stock-price" },
      { label: "Expectations", topicId: "earnings" },
      { label: "Valuation", topicId: "valuation" },
      { label: "Risk premium", topicId: "risk-premium" },
    ];
    return `
      <article class="calendar-card importance-${escapeHtml(event.importance || "medium")}">
        <div class="calendar-date">
          <span>${event.date ? formatEventDay(event.date) : "TBD"}</span>
          <strong>${event.date ? formatEventMonth(event.date) : "No date"}</strong>
        </div>
        <div class="calendar-body">
          <div class="holding-top">
            <div>
              <strong>${escapeHtml(event.title || "Untitled event")}</strong>
              <span>${labelForEventType(event.type)} · ${labelForEventStatus(event.status)} · ${labelForPriority(event.importance)}</span>
            </div>
            <div class="holding-actions">
              <button type="button" data-edit-event="${event.id}">Edit</button>
              <button type="button" data-delete-event="${event.id}">Delete</button>
            </div>
          </div>
          ${event.ticker ? `<p class="focus-note"><span>Related ticker</span>${escapeHtml(event.ticker)}</p>` : ""}
          ${focusSection("Why it matters", event.impact)}
          ${event.source ? `<p class="focus-note"><span>Source</span><a href="${escapeHtml(event.source)}" target="_blank" rel="noreferrer">${escapeHtml(event.source)}</a></p>` : ""}
          ${focusSection("Next Action", event.action)}
          <div class="holding-tags">${related.map((topic) => `<button type="button" data-topic-link="${topic.topicId}">${topic.label}</button>`).join("")}</div>
        </div>
      </article>
    `;
  }).join("");
}

function eventSortValue(event) {
  if (!event.date) return Number.MAX_SAFE_INTEGER;
  return new Date(`${event.date}T00:00:00`).getTime();
}

function formatEventDay(date) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "TBD";
  return String(parsed.getDate()).padStart(2, "0");
}

function formatEventMonth(date) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "No date";
  return parsed.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

function labelForEventType(type) {
  return {
    ipo: "IPO / listing",
    product: "Product launch",
    earnings: "Earnings",
    macro: "Macro / policy",
    funding: "Funding / valuation",
    other: "Other",
  }[type] || "Other";
}

function labelForEventStatus(status) {
  return {
    rumor: "Rumor / unconfirmed",
    watching: "Watching",
    confirmed: "Confirmed",
    done: "Done",
  }[status] || "Watching";
}

function renderNews() {
  if (!els.newsTickers.value.trim()) setDefaultNewsTickers();

  const query = els.newsFilter.value.trim().toLowerCase();
  const filtered = state.news.filter((item) => {
    if (!query) return true;
    return [item.headline, item.summary, item.source, item.querySymbol, item.related]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
  const symbols = [...new Set(filtered.map((item) => item.querySymbol).filter(Boolean))];
  const sources = [...new Set(filtered.map((item) => item.source).filter(Boolean))];
  const newest = filtered[0]?.datetime ? new Date(filtered[0].datetime * 1000) : null;

  els.newsStats.innerHTML = [
    ["Articles", String(filtered.length)],
    ["Tickers", String(symbols.length)],
    ["Sources", String(sources.length)],
    ["Newest", newest ? newest.toLocaleString() : "-"],
  ].map(([label, value]) => `
    <div class="portfolio-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  els.newsCount.textContent = state.news.length ? `${filtered.length} shown` : "not loaded";
  els.newsList.innerHTML = filtered.length ? filtered.map((item) => `
    <article class="news-card">
      <div class="news-card-head">
        <span>${escapeHtml(item.querySymbol || item.related || "NEWS")}</span>
        <small>${item.datetime ? new Date(item.datetime * 1000).toLocaleString() : ""}</small>
      </div>
      <h4>
        <span class="news-title-en">${escapeHtml(item.headline || "Untitled news")}</span>
        ${item.translatedHeadline ? `<span class="news-title-zh">${escapeHtml(item.translatedHeadline)}</span>` : ""}
      </h4>
      ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
      <div class="news-meta">
        <span>${escapeHtml(item.source || "Unknown source")}</span>
        ${item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open story</a>` : ""}
      </div>
    </article>
  `).join("") : `
    <div class="empty-state">
      <strong>No news loaded yet.</strong>
      <span>Click Use My Tickers, then Fetch News. Finnhub company-news works best for listed tickers such as MU, NVDA, TSM, INTC, LITE, AAOI, NBIS.</span>
    </div>
  `;
}

function changeText(holding) {
  const change = Number(holding.lastChange);
  const pct = Number(holding.lastChangePercent);
  if (!Number.isFinite(change) || !Number.isFinite(pct)) return "updated";
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)} (${sign}${pct.toFixed(2)}%)`;
}

function pnlClass(value) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "";
}

function formFocus() {
  const existing = els.focusForm.dataset.editing;
  return {
    id: existing || newId(els.focusSymbol.value || "focus"),
    symbol: els.focusSymbol.value.trim().toUpperCase(),
    priority: els.focusPriority.value,
    status: els.focusStatus.value,
    price: els.focusPrice.value,
    thesis: els.focusThesis.value.trim(),
    catalyst: els.focusCatalyst.value.trim(),
    risk: els.focusRisk.value.trim(),
    action: els.focusAction.value.trim(),
  };
}

function fillFocusForm(item) {
  els.focusForm.dataset.editing = item.id;
  els.focusSymbol.value = item.symbol || "";
  els.focusPriority.value = item.priority || "medium";
  els.focusStatus.value = item.status || "watching";
  els.focusPrice.value = item.price || "";
  els.focusThesis.value = item.thesis || "";
  els.focusCatalyst.value = item.catalyst || "";
  els.focusRisk.value = item.risk || "";
  els.focusAction.value = item.action || "";
}

function clearFocusForm() {
  els.focusForm.reset();
  delete els.focusForm.dataset.editing;
  els.focusPriority.value = "high";
  els.focusStatus.value = "watching";
}

function formCalendarEvent() {
  const existing = els.calendarForm.dataset.editing;
  return {
    id: existing || newId("event"),
    date: els.eventDate.value,
    title: els.eventTitle.value.trim(),
    type: els.eventType.value,
    importance: els.eventImportance.value,
    status: els.eventStatus.value,
    ticker: els.eventTicker.value.trim().toUpperCase(),
    impact: els.eventImpact.value.trim(),
    source: els.eventSource.value.trim(),
    action: els.eventAction.value.trim(),
  };
}

function fillCalendarForm(event) {
  els.calendarForm.dataset.editing = event.id;
  els.eventDate.value = event.date || "";
  els.eventTitle.value = event.title || "";
  els.eventType.value = event.type || "other";
  els.eventImportance.value = event.importance || "medium";
  els.eventStatus.value = event.status || "watching";
  els.eventTicker.value = event.ticker || "";
  els.eventImpact.value = event.impact || "";
  els.eventSource.value = event.source || "";
  els.eventAction.value = event.action || "";
}

function clearCalendarForm() {
  els.calendarForm.reset();
  delete els.calendarForm.dataset.editing;
  els.eventType.value = "ipo";
  els.eventImportance.value = "high";
  els.eventStatus.value = "rumor";
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportFocus() {
  downloadJson(`market-focus-${new Date().toISOString().slice(0, 10)}.json`, { version: 1, items: state.focusList });
}

function exportCalendar() {
  downloadJson(`market-calendar-${new Date().toISOString().slice(0, 10)}.json`, { version: 1, events: state.calendar });
}

function importFocus(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed.items)) throw new Error("Missing focus names");
      state.focusList = parsed.items;
      saveFocus();
      renderFocus();
    } catch {
      window.alert("Import failed. Please choose a focus JSON export.");
    }
  });
  reader.readAsText(file);
}

function importCalendar(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed.events)) throw new Error("Missing calendar events");
      state.calendar = parsed.events;
      saveCalendar();
      renderCalendar();
    } catch {
      window.alert("Import failed. Please choose a calendar JSON export.");
    }
  });
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

els.categoryNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) selectCategory(button.dataset.category);
});

els.categorySummary.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) selectCategory(button.dataset.category);
});

els.topicList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (button) selectTopic(button.dataset.topic);
});

els.topicDetail.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (button) selectTopic(button.dataset.topic);
});

els.graph.addEventListener("click", (event) => {
  const node = event.target.closest("[data-topic]");
  if (node) selectTopic(node.dataset.topic);
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  const visible = filteredTopics();
  if (!visible.some((item) => item.id === state.activeTopic)) {
    state.activeTopic = visible[0]?.id || TOPICS[0].id;
  }
  renderTopicList();
  renderDetail();
  renderGraph();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderTopicList();
});

els.viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
});

els.focusBtn.addEventListener("click", () => {
  state.activeCategory = "all";
  render();
});

els.researchFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-research-filter]");
  if (!button) return;
  state.researchFilter = button.dataset.researchFilter;
  const visible = filteredResearch();
  if (!visible.some((item) => item.id === state.activeResearchId)) {
    state.activeResearchId = visible[0]?.id || state.researchItems[0]?.id || "";
  }
  renderResearch();
});

els.researchCards.addEventListener("click", (event) => {
  const card = event.target.closest("[data-research-id]");
  if (!card) return;
  state.activeResearchId = card.dataset.researchId;
  renderResearchCards();
  renderResearchDetail();
});

els.researchDetail.addEventListener("click", (event) => {
  const edit = event.target.closest("[data-edit-research]");
  const del = event.target.closest("[data-delete-research]");
  if (edit) {
    const item = researchById(edit.dataset.editResearch);
    if (item) fillResearchForm(item);
  }
  if (del) {
    const item = researchById(del.dataset.deleteResearch);
    if (!item || !window.confirm(`Delete research for ${item.basicInfo.ticker}?`)) return;
    state.researchItems = state.researchItems.filter((research) => research.id !== item.id);
    state.activeResearchId = state.researchItems[0]?.id || "";
    saveResearch();
    renderResearch();
  }
});

els.researchConviction.addEventListener("input", updateConvictionLabel);

els.newResearchBtn.addEventListener("click", clearResearchForm);
els.clearResearchFormBtn.addEventListener("click", clearResearchForm);
els.exportResearchBtn.addEventListener("click", exportResearch);

els.importResearchInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importResearch(file);
  event.target.value = "";
});

els.researchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = formResearch();
  if (!item.basicInfo.ticker) {
    window.alert("Please enter a ticker.");
    return;
  }
  const index = state.researchItems.findIndex((research) => research.id === item.id);
  if (index >= 0) {
    state.researchItems[index] = item;
  } else {
    state.researchItems.unshift(item);
  }
  state.activeResearchId = item.id;
  saveResearch();
  renderResearch();
});

[els.strategySelect, els.spotInput, els.strikeInput, els.premiumInput].forEach((input) => {
  input.addEventListener("input", renderPayoff);
});

els.saveFinnhubKeyBtn.addEventListener("click", saveFinnhubKey);

els.focusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = formFocus();
  if (!item.symbol) {
    window.alert("Please enter a ticker symbol.");
    return;
  }
  const index = state.focusList.findIndex((focus) => focus.id === item.id);
  if (index >= 0) {
    state.focusList[index] = item;
  } else {
    state.focusList.push(item);
  }
  saveFocus();
  clearFocusForm();
  renderFocus();
});

els.focusList.addEventListener("click", (event) => {
  const edit = event.target.closest("[data-edit-focus]");
  const del = event.target.closest("[data-delete-focus]");
  const topicLink = event.target.closest("[data-topic-link]");
  if (topicLink) {
    selectTopic(topicLink.dataset.topicLink);
    setView("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (edit) {
    const item = state.focusList.find((focus) => focus.id === edit.dataset.editFocus);
    if (item) fillFocusForm(item);
  }
  if (del) {
    state.focusList = state.focusList.filter((focus) => focus.id !== del.dataset.deleteFocus);
    saveFocus();
    renderFocus();
  }
});

els.refreshFocusBtn.addEventListener("click", refreshFocusPrices);
els.exportFocusBtn.addEventListener("click", exportFocus);

els.importFocusInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importFocus(file);
  event.target.value = "";
});

els.calendarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = formCalendarEvent();
  if (!item.title) {
    window.alert("Please enter a topic or company.");
    return;
  }
  const index = state.calendar.findIndex((eventItem) => eventItem.id === item.id);
  if (index >= 0) {
    state.calendar[index] = item;
  } else {
    state.calendar.push(item);
  }
  saveCalendar();
  clearCalendarForm();
  renderCalendar();
});

els.calendarList.addEventListener("click", (event) => {
  const edit = event.target.closest("[data-edit-event]");
  const del = event.target.closest("[data-delete-event]");
  const topicLink = event.target.closest("[data-topic-link]");
  if (topicLink) {
    selectTopic(topicLink.dataset.topicLink);
    setView("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (edit) {
    const item = state.calendar.find((eventItem) => eventItem.id === edit.dataset.editEvent);
    if (item) fillCalendarForm(item);
  }
  if (del) {
    state.calendar = state.calendar.filter((eventItem) => eventItem.id !== del.dataset.deleteEvent);
    saveCalendar();
    renderCalendar();
  }
});

els.exportCalendarBtn.addEventListener("click", exportCalendar);

els.importCalendarInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importCalendar(file);
  event.target.value = "";
});

els.loadDefaultNewsBtn.addEventListener("click", () => {
  setDefaultNewsTickers();
  renderNews();
});

els.refreshNewsBtn.addEventListener("click", refreshNews);
els.translateNewsBtn.addEventListener("click", translateNewsTitles);
els.newsFilter.addEventListener("input", renderNews);
els.newsLookback.addEventListener("change", renderNews);
els.newsTickers.addEventListener("input", renderNews);

render();
safeRun("loadFinnhubKey", loadFinnhubKey);
safeRun("loadFocus", loadFocus);
safeRun("loadResearch", loadResearch);
safeRun("loadCalendar", loadCalendar);
safeRun("renderPayoff", renderPayoff);
safeRun("renderFocus", renderFocus);
safeRun("renderResearch", renderResearch);
safeRun("renderCalendar", renderCalendar);
safeRun("renderNews", renderNews);
