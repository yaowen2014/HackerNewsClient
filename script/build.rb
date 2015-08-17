require './script/render_anywhere'
class HtmlBuilder
  include RenderAnywhere

  def build_html templateName, useLayout
    html = render :template => "home/#{templateName}",
    :layout => useLayout
    html
  end
end

builder = HtmlBuilder.new

build_map = [
             {
               :templateName => "index",
               :fileName => "index.html",
               :useLayout => true
             }
]

build_map.each do |build_entry|
  puts "Building HTML: #{build_entry[:templateName]}"
  html = builder.build_html(build_entry[:templateName], build_entry[:useLayout] || false)
  html_file = File.open("./public/#{build_entry[:fileName]}", "w")
  html_file.puts(html)
  html_file.close
end
