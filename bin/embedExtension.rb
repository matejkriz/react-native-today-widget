#!/usr/bin/env ruby
require 'rubygems'
require 'xcodeproj'
puts 'Starting embed extension script'

project_location = './' # running as bin from root project
extension_proj = 'RNTodayWidgetExtension.xcodeproj'
project_path = Dir.glob("#{project_location}ios/*.{xcodeproj,xcworkspace}").first
extension_path = "#{project_location}node_modules/react-native-today-widget/ios/#{extension_proj}"
abort "Couldn't find XCode project in '#{project_location}ios/'" if project_path.nil?

# load XCode projects and targets
project = Xcodeproj::Project.open(project_path)
app_target = project.targets.find { |t| !t.name['^(?!.*(tvOS|Tests)).*$'] }

project_ext = project.files.find do |file|
  file.name == extension_proj
end
appex_ref = project_ext.file_reference_proxies.first

extension = Xcodeproj::Project.open(extension_path)

# add extension target as dependency for app target
extension.targets.each do |target|
 dependency = app_target.dependency_for_target(target)
   if dependency
     puts "[WARN] App already has dependency on #{target.name}"
   else
     app_target.add_dependency(target)
   end
end

# try to find existin copy files build phase
embed_extensions_phase = app_target.copy_files_build_phases.find do |copy_phase|
  copy_phase.symbol_dst_subfolder_spec == :plug_ins
end

# create new copy files build phase if there is no for plugins
if embed_extensions_phase.nil?
  embed_extensions_phase = app_target.new_copy_files_build_phase()
  embed_extensions_phase.symbol_dst_subfolder_spec = :plug_ins
  embed_extensions_phase.name = 'Embed App Extensions'
end

# embed extension binary to copy files build phase
appex_included = embed_extensions_phase.files_references.include? appex_ref
if appex_included
  puts "[WARN] App already embeds #{appex_ref.display_name}"
else
  build_file = embed_extensions_phase.add_file_reference(appex_ref)
  build_file.settings = { "ATTRIBUTES" => ['RemoveHeadersOnCopy'] }
end

puts 'Finishing embed extension script'
# save XCode project
project.save
