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
  portfolio: [],
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
  portfolioView: document.querySelector("#portfolioView"),
  portfolioWorkspace: document.querySelector("#portfolioWorkspace"),
  portfolioStats: document.querySelector("#portfolioStats"),
  portfolioList: document.querySelector("#portfolioList"),
  portfolioCount: document.querySelector("#portfolioCount"),
  portfolioForm: document.querySelector("#portfolioForm"),
  holdingKind: document.querySelector("#holdingKind"),
  holdingSymbol: document.querySelector("#holdingSymbol"),
  holdingSide: document.querySelector("#holdingSide"),
  holdingQty: document.querySelector("#holdingQty"),
  holdingCost: document.querySelector("#holdingCost"),
  holdingPrice: document.querySelector("#holdingPrice"),
  holdingStrike: document.querySelector("#holdingStrike"),
  holdingExpiration: document.querySelector("#holdingExpiration"),
  holdingNotes: document.querySelector("#holdingNotes"),
  finnhubKeyInput: document.querySelector("#finnhubKeyInput"),
  saveFinnhubKeyBtn: document.querySelector("#saveFinnhubKeyBtn"),
  refreshPricesBtn: document.querySelector("#refreshPricesBtn"),
  exportPortfolioBtn: document.querySelector("#exportPortfolioBtn"),
  importPortfolioInput: document.querySelector("#importPortfolioInput"),
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
const PORTFOLIO_KEY = "market-knowledge-portfolio-v1";
const FINNHUB_KEY = "market-knowledge-finnhub-key";
const STARTER_HOLDINGS = [
  starterStock("MU"),
  starterStock("INTC"),
  starterStock("LITE"),
  starterStock("AAOI"),
  starterStock("NBIS"),
  starterOption("NOK"),
  starterOption("NVDA"),
];

function topic(id, title, english, category, difficulty, related, summary, mechanics, pitfalls) {
  return { id, title, english, category, difficulty, related, summary, mechanics, pitfalls };
}

function starterStock(symbol) {
  return {
    id: newId(symbol),
    kind: "stock",
    symbol,
    side: "long",
    qty: "",
    cost: "",
    price: "",
    strike: "",
    expiration: "",
    notes: "",
  };
}

function starterOption(symbol) {
  return {
    id: newId(symbol),
    kind: "option",
    symbol,
    side: "buyCall",
    qty: "",
    cost: "",
    price: "",
    strike: "",
    expiration: "",
    notes: "",
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

function renderGraph() {
  const active = topicById[state.activeTopic] || TOPICS[0];
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

function render() {
  renderPageTitle();
  renderCategoryNav();
  renderSummary();
  renderTopicList();
  renderDetail();
  renderGraph();
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
  els.portfolioView.classList.toggle("hidden", view !== "portfolio");
  if (view === "lab") renderPayoff();
  if (view === "portfolio") renderPortfolio();
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

function loadPortfolio() {
  try {
    const saved = JSON.parse(localStorage.getItem(PORTFOLIO_KEY) || "null");
    state.portfolio = Array.isArray(saved?.holdings) && saved.holdings.length ? saved.holdings : STARTER_HOLDINGS;
  } catch {
    state.portfolio = STARTER_HOLDINGS;
  }
  els.finnhubKeyInput.value = localStorage.getItem(FINNHUB_KEY) || "";
}

function savePortfolio() {
  localStorage.setItem(
    PORTFOLIO_KEY,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), holdings: state.portfolio }),
  );
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

async function refreshPrices() {
  const key = (els.finnhubKeyInput.value.trim() || localStorage.getItem(FINNHUB_KEY) || "").trim();
  if (!key) {
    window.alert("Paste a Finnhub API key first, then click Save Key.");
    return;
  }

  els.refreshPricesBtn.disabled = true;
  els.refreshPricesBtn.textContent = "Refreshing...";

  try {
    const symbols = [...new Set(state.portfolio.map((item) => item.symbol).filter(Boolean))];
    const quotes = await Promise.all(symbols.map(async (symbol) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(key)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Quote failed for ${symbol}`);
      const data = await response.json();
      return [symbol, data];
    }));

    const quoteBySymbol = Object.fromEntries(quotes);
    state.portfolio = state.portfolio.map((holding) => {
      const quote = quoteBySymbol[holding.symbol];
      if (!quote || !Number(quote.c)) return holding;
      return {
        ...holding,
        price: String(quote.c),
        lastChange: quote.d,
        lastChangePercent: quote.dp,
        lastUpdated: quote.t ? new Date(quote.t * 1000).toISOString() : new Date().toISOString(),
      };
    });
    savePortfolio();
    renderPortfolio();
  } catch (error) {
    window.alert(`Price refresh failed: ${error.message}`);
  } finally {
    els.refreshPricesBtn.disabled = false;
    els.refreshPricesBtn.textContent = "Refresh Prices";
  }
}

function holdingMath(holding) {
  const qty = Number(holding.qty) || 0;
  const cost = Number(holding.cost) || 0;
  const price = Number(holding.price) || 0;
  const multiplier = holding.kind === "option" ? 100 : 1;
  const direction = holding.kind === "option" && holding.side.startsWith("sell") ? -1 : 1;
  const costBasis = qty * cost * multiplier;
  const marketValue = qty * price * multiplier * direction;
  const pnl = holding.kind === "option" && holding.side.startsWith("sell")
    ? qty * (cost - price) * multiplier
    : qty * (price - cost) * multiplier;
  return { qty, cost, price, multiplier, costBasis, marketValue, pnl };
}

function renderPortfolio() {
  if (!state.portfolio.length) {
    state.portfolio = STARTER_HOLDINGS;
    savePortfolio();
  }

  const rows = state.portfolio.map((holding) => ({ holding, math: holdingMath(holding) }));
  const totalValue = rows.reduce((sum, row) => sum + row.math.marketValue, 0);
  const totalCost = rows.reduce((sum, row) => sum + row.math.costBasis, 0);
  const totalPnl = rows.reduce((sum, row) => sum + row.math.pnl, 0);
  const priced = rows.filter((row) => row.math.qty && row.math.price);

  els.portfolioStats.innerHTML = [
    ["Market Value", money(totalValue)],
    ["Cost / Premium Basis", money(totalCost)],
    ["Unrealized P/L", money(totalPnl)],
    ["Tracked Names", String(state.portfolio.length)],
  ].map(([label, value]) => `
    <div class="portfolio-stat">
      <span>${label}</span>
      <strong class="${label.includes("P/L") ? (totalPnl >= 0 ? "positive" : "negative") : ""}">${value}</strong>
    </div>
  `).join("");

  els.portfolioCount.textContent = `${priced.length} priced`;
  els.portfolioList.innerHTML = state.portfolio.map((holding) => {
    const math = holdingMath(holding);
    const related = holding.kind === "option"
      ? relatedForOption(holding.side)
      : ["股票为什么会涨跌", "财报与预期差", "仓位管理"];
    return `
      <article class="holding-card">
        <div class="holding-top">
          <div>
            <strong>${escapeHtml(holding.symbol || "NEW")}</strong>
            <span>${holding.kind === "option" ? labelForSide(holding.side) : "Long Stock"}</span>
          </div>
          <div class="holding-actions">
            <button type="button" data-edit-holding="${holding.id}">Edit</button>
            <button type="button" data-delete-holding="${holding.id}">Delete</button>
          </div>
        </div>
        <div class="holding-metrics">
          <span>Qty <strong>${holding.qty || "-"}</strong></span>
          <span>Cost <strong>${holding.cost ? money(holding.cost) : "-"}</strong></span>
          <span>Price <strong>${holding.price ? money(holding.price) : "-"}</strong></span>
          <span>P/L <strong class="${math.pnl >= 0 ? "positive" : "negative"}">${holding.qty && holding.cost && holding.price ? money(math.pnl) : "-"}</strong></span>
        </div>
        ${holding.lastUpdated ? `<p class="holding-detail">Quote ${changeText(holding)} · ${new Date(holding.lastUpdated).toLocaleString()}</p>` : ""}
        ${holding.kind === "option" ? `<p class="holding-detail">Strike ${holding.strike || "-"} · Exp ${holding.expiration || "-"}</p>` : ""}
        ${holding.notes ? `<p class="holding-notes">${escapeHtml(holding.notes)}</p>` : ""}
        <div class="holding-tags">${related.map((item) => `<span>${item}</span>`).join("")}</div>
      </article>
    `;
  }).join("");
}

function relatedForOption(side) {
  if (side === "sellPut") return ["Sell Put", "Assignment", "Theta", "Rollover"];
  if (side === "sellCall") return ["Sell Call", "Covered Call", "Assignment", "Gamma"];
  if (side === "buyPut") return ["Buy Put", "Protective Put", "Tail Risk", "Vega"];
  return ["Buy Call", "Delta", "Vega", "Gamma"];
}

function labelForSide(side) {
  return {
    long: "Long Stock",
    buyCall: "Buy Call",
    buyPut: "Buy Put",
    sellPut: "Sell Put",
    sellCall: "Sell Call",
  }[side] || side;
}

function changeText(holding) {
  const change = Number(holding.lastChange);
  const pct = Number(holding.lastChangePercent);
  if (!Number.isFinite(change) || !Number.isFinite(pct)) return "updated";
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)} (${sign}${pct.toFixed(2)}%)`;
}

function formHolding() {
  const existing = els.portfolioForm.dataset.editing;
  return {
    id: existing || newId(els.holdingSymbol.value || "holding"),
    kind: els.holdingKind.value,
    symbol: els.holdingSymbol.value.trim().toUpperCase(),
    side: els.holdingSide.value,
    qty: els.holdingQty.value,
    cost: els.holdingCost.value,
    price: els.holdingPrice.value,
    strike: els.holdingStrike.value,
    expiration: els.holdingExpiration.value,
    notes: els.holdingNotes.value.trim(),
  };
}

function fillHoldingForm(holding) {
  els.portfolioForm.dataset.editing = holding.id;
  els.holdingKind.value = holding.kind || "stock";
  els.holdingSymbol.value = holding.symbol || "";
  els.holdingSide.value = holding.side || "long";
  els.holdingQty.value = holding.qty || "";
  els.holdingCost.value = holding.cost || "";
  els.holdingPrice.value = holding.price || "";
  els.holdingStrike.value = holding.strike || "";
  els.holdingExpiration.value = holding.expiration || "";
  els.holdingNotes.value = holding.notes || "";
}

function clearHoldingForm() {
  els.portfolioForm.reset();
  delete els.portfolioForm.dataset.editing;
  els.holdingSide.value = "long";
}

function exportPortfolio() {
  const blob = new Blob([JSON.stringify({ version: 1, holdings: state.portfolio }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `market-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importPortfolio(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed.holdings)) throw new Error("Missing holdings");
      state.portfolio = parsed.holdings;
      savePortfolio();
      renderPortfolio();
    } catch {
      window.alert("Import failed. Please choose a portfolio JSON export.");
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

[els.strategySelect, els.spotInput, els.strikeInput, els.premiumInput].forEach((input) => {
  input.addEventListener("input", renderPayoff);
});

els.portfolioForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const holding = formHolding();
  if (!holding.symbol) {
    window.alert("Please enter a ticker symbol.");
    return;
  }
  const index = state.portfolio.findIndex((item) => item.id === holding.id);
  if (index >= 0) {
    state.portfolio[index] = holding;
  } else {
    state.portfolio.push(holding);
  }
  savePortfolio();
  clearHoldingForm();
  renderPortfolio();
});

els.portfolioList.addEventListener("click", (event) => {
  const edit = event.target.closest("[data-edit-holding]");
  const del = event.target.closest("[data-delete-holding]");
  if (edit) {
    const holding = state.portfolio.find((item) => item.id === edit.dataset.editHolding);
    if (holding) fillHoldingForm(holding);
  }
  if (del) {
    state.portfolio = state.portfolio.filter((item) => item.id !== del.dataset.deleteHolding);
    savePortfolio();
    renderPortfolio();
  }
});

els.exportPortfolioBtn.addEventListener("click", exportPortfolio);

els.saveFinnhubKeyBtn.addEventListener("click", saveFinnhubKey);
els.refreshPricesBtn.addEventListener("click", refreshPrices);

els.importPortfolioInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importPortfolio(file);
  event.target.value = "";
});

loadPortfolio();
render();
renderPayoff();
renderPortfolio();
