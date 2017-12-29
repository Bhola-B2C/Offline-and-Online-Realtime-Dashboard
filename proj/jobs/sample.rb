require 'firebase'
base_uri = 'https://dashing-project-1512033832561.firebaseio.com/'
@firebase = Firebase::Client.new(base_uri)

current_valuation = 0
current_karma = 0

last_valuation = current_valuation
last_karma     = current_karma
current_valuation = rand(100)
current_karma     = rand(200000)

res = @firebase.get("widget")
parsed = JSON.parse(res.raw_body)
final = parsed.values[(parsed.length())-1]


send_event('valuation', { current: current_valuation, last: last_valuation })
send_event('karma', { current: current_karma, last: last_karma })
send_event('synergy',   { value: final })